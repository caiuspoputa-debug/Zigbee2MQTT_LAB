# Source and scope

- Runtime image: `ghcr.io/koenkk/zigbee2mqtt:2.14.1`
- Zigbee2MQTT: `2.14.1`
- zigbee-herdsman: `10.9.2`
- zigbee-on-host: `0.2.4`
- M1S/TCP defaults: `Aqara_M1S_0.1.0_COORDINATOR_LAB_2026-09-22.zip`

Instrumentation scope:

1. `ASSOC_REQ`
2. `ASSOC_RESULT`
3. `ASSOC_RSP_SENT`
4. `TRANSPORT_KEY_SENT`
5. `AUTHORIZED`
6. `DEVICE_ANNCE`
7. `DEVICE_JOINED_CALLBACK`

LAB 11 pastreaza integral LAB 9 si adauga un singur test diagnostic inainte de prima tentativa de livrare a `TRANSPORT_KEY`: la primul `DATA_REQ` cu cheia deja in coada trimite un cadru MAC DATA gol, adresat short, cu `ackRequest=true` si `framePending=true`. Cheia ramane in coada si este incercata abia la urmatorul `DATA_REQ`. Testul separa raspunsul MAC/RCP la poll de continutul `TRANSPORT_KEY`.
