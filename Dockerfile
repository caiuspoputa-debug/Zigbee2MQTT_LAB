FROM ghcr.io/koenkk/zigbee2mqtt:2.14.1

USER root

RUN apk add --no-cache jq

COPY patches/mac-handler.js /tmp/zoh-lab/mac-handler.js
COPY patches/aps-handler.js /tmp/zoh-lab/aps-handler.js
COPY patches/ot-rcp-driver.js /tmp/zoh-lab/ot-rcp-driver.js

RUN test "$(node -p "require('/app/package.json').version")" = "2.14.1" && \
    test "$(node -p "require('/app/node_modules/zigbee-herdsman/package.json').version")" = "10.9.2" && \
    test "$(node -p "require('/app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/package.json').version")" = "0.2.4" && \
    install -m 0644 /tmp/zoh-lab/mac-handler.js /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/mac-handler.js && \
    install -m 0644 /tmp/zoh-lab/aps-handler.js /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/aps-handler.js && \
    install -m 0644 /tmp/zoh-lab/ot-rcp-driver.js /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/drivers/ot-rcp-driver.js && \
    node --check /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/mac-handler.js && \
    node --check /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/aps-handler.js && \
    node --check /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/drivers/ot-rcp-driver.js && \
    test "$(grep -c '\[AQARA-JOIN\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/mac-handler.js)" = "9" && \
    test "$(grep -c '\[AQARA-JOIN\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/aps-handler.js)" = "3" && \
    test "$(grep -c '\[AQARA-LAB8\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/aps-handler.js)" = "1" && \
    test "$(grep -c '\[AQARA-LAB9\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/drivers/ot-rcp-driver.js)" = "1" && \
    test "$(grep -c '\[AQARA-LAB15\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/zigbee-stack/mac-handler.js)" = "3" && \
    test "$(grep -c '\[AQARA-LAB12\]' /app/node_modules/.pnpm/zigbee-on-host@0.2.4/node_modules/zigbee-on-host/dist/drivers/ot-rcp-driver.js)" = "1" && \
    rm -rf /tmp/zoh-lab

COPY run.sh /usr/local/bin/run-z2m-m1s-lab
COPY sync-options.cjs /usr/local/lib/sync-options.cjs
RUN chmod 0755 /usr/local/bin/run-z2m-m1s-lab

ENV ZIGBEE2MQTT_DATA=/config

CMD ["/sbin/tini", "--", "/usr/local/bin/run-z2m-m1s-lab"]
