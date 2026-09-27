const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, 'patches/ot-rcp-driver.js'), 'utf8');
const start = source.indexOf('    async onFrame(buffer) {');
const end = source.indexOf('    async sendCommand(', start);
assert(start >= 0 && end > start);
const warnings = [], cleared = [];
let fail = true, spinelFail = false, resolved = 0, decoded = 0;
const pending = new Map([[1, {timer: 123, resolve() {resolved++;}, reject() {throw new Error('unexpected reject');}}]]);
const driver = vm.runInNewContext(`new (class {
    #tidWaiters = pending;
    #resetWaiter;
    ${source.slice(start, end)}
})()`, {
    pending, NS: 'test',
    clearTimeout(id) {cleared.push(id);},
    logger_js_1: {logger: {warning(message) {warnings.push(message);}, debug() {}}},
    hdlc_js_1: {decodeHdlcFrame(buffer) {
        if (fail === true) throw new Error('HDLC parsing error');
        if (fail === 'other') throw new Error('unexpected decoder error');
        return buffer;
    }},
    spinel_js_1: {SPINEL_HEADER_FLG_SPINEL: 2, decodeSpinelFrame() {
        decoded++;
        if (spinelFail) throw new Error('spinel failure');
        return {header: {flg: 2, tid: 1}, commandId: 0, payload: Buffer.alloc(0)};
    }},
    statuses_js_1: {SpinelStatus: {OK: 0}},
});
(async () => {
    await driver.onFrame(Buffer.alloc(5));
    assert.equal(warnings.length, 1);
    assert.equal(decoded, 0);
    assert.equal(pending.size, 1);
    assert.equal(cleared.length, 0);
    fail = false;
    await driver.onFrame(Buffer.alloc(8));
    assert.equal(resolved, 1);
    assert.equal(pending.size, 0);
    assert.deepEqual(cleared, [123]);
    fail = 'other';
    await assert.rejects(driver.onFrame(Buffer.alloc(1)), /unexpected decoder error/);
    fail = false;
    spinelFail = true;
    await assert.rejects(driver.onFrame(Buffer.alloc(1)), /spinel failure/);
    console.log('PASS HDLC drop, waiter preservation, next valid frame, unrelated error propagation');
})().catch(error => {console.error(error); process.exitCode = 1;});
