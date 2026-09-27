const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, process.argv[2] || '.', 'patches/aps-handler.js'), 'utf8');
async function scenario(mode) {
    const timers = new Map();
    const errors = [];
    let id = 0, sends = 0, handler;
    const exports = {};
    const logger = {debug() {}, info() {}, warning() {}, error(message) { errors.push(message); }};
    vm.runInNewContext(source, {
        exports, Buffer,
        setTimeout(fn) { timers.set(++id, fn); return id; },
        clearTimeout(key) { timers.delete(key); },
        require(name) {
            if (name.includes('logger')) return {logger};
            return {
                encodeMACFrameZigbee: () => Buffer.alloc(1),
                encodeZigbeeAPSFrame: () => Buffer.alloc(1),
                encodeZigbeeNWKFrame: () => Buffer.alloc(1),
                CONFIG_NWK_MAX_HOPS: 30,
            };
        },
    });
    const ack = (counter = 1) => handler.processFrame(Buffer.alloc(0), {}, {source16: 123}, {counter, frameControl: {frameType: 2}}, 255);
    handler = new exports.APSHandler({
        deviceTable: new Map(), address16ToAddress64: new Map(), indirectTransmissions: new Map(),
        netParams: {eui64: 1n, panId: 1, networkKeySequenceNumber: 0},
        decrementRadius: n => n, nextNWKKeyFrameCounter: () => 1,
    }, {
        nextSeqNum: () => 1,
        async sendFrame() {
            sends++;
            if (mode === 'early') await ack();
            if (mode === 'wrong') await ack(99);
            if (mode === 'throw') throw new Error('radio failure');
            if (mode === 'false') return false;
            return true;
        },
    }, {nextSeqNum: () => 1, findBestSourceRoute: () => [undefined, undefined]}, {});
    const send = () => handler.sendData(Buffer.from([1]), 0, mode === 'broadcast' ? 65535 : 123, undefined, 0, 5, 0, 0, 0);
    if (mode === 'throw' || mode === 'false') await assert.rejects(send);
    else await send();
    if (mode === 'late') await ack();
    if (mode === 'missing' || mode === 'wrong') {
        assert.equal(timers.size, 1);
        for (let i = 0; i < 4; i++) {
            const [key, fn] = timers.entries().next().value;
            timers.delete(key);
            await fn();
        }
        assert.equal(sends, 4);
        assert.equal(errors.filter(x => x.includes('Retries exhausted')).length, 1);
    }
    assert.equal(timers.size, 0, `${mode}: unexpected pending timeout`);
    handler.stop();
    console.log(`PASS ${mode}`);
}
(async () => {
    for (const mode of ['early', 'late', 'missing', 'wrong', 'throw', 'false', 'broadcast']) await scenario(mode);
})().catch(error => { console.error(error); process.exitCode = 1; });
