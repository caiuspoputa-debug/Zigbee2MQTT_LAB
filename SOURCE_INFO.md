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

LAB 9 pastreaza cheia, securitatea, adresarea MAC IEEE din LAB 8, starea de asociere, autorizarea si callback-urile existente. Singura schimbare functionala noua este retinerea intrarii IEEE in `MAC_SRC_MATCH` cat timp exista transmisii indirecte in coada; adresa short ramane prezenta in paralel.
