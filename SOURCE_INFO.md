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

LAB 8 pastreaza cheia, securitatea, starea de asociere, autorizarea si callback-urile din LAB 7. Singura schimbare functionala noua este adresarea MAC extinsa (IEEE) pentru `TRANSPORT_KEY` initial, numai la unicast direct; destinatia NWK ramane adresa scurta.
