# Zigbee2MQTT M1S ZoH LAB Experimental

Add-on local Home Assistant bazat pe Zigbee2MQTT 2.14.1, cu:

- zigbee-herdsman 10.9.2;
- zigbee-on-host 0.2.4;
- conexiune M1S prin `tcp://IP_M1S:1886`, cu `adapter: zoh`;
- unsprezece diagnostice `[AQARA-JOIN]`, inclusiv cererea de date si livrarea indirecta pentru dispozitivele pe baterie.
- remediere experimentala pentru sincronizarea asocierilor si a cozii indirecte cu listele MAC source-match ale RCP-ului;
- retransmiterea cadrului indirect la urmatorul DATA_REQUEST atunci cand transmisia primeste NO_ACK.

LAB 10 pastreaza integral LAB 9 si introduce un probe diagnostic izolat. La primul `DATA_REQ` dupa asociere, cand `TRANSPORT_KEY` este deja in coada, coordinatorul trimite un cadru MAC DATA gol catre adresa short a copilului, cu ACK solicitat si `framePending=true`. Probe-ul nu scoate cheia din coada; `TRANSPORT_KEY` este incercat abia la urmatorul poll.

## Instalare minima in Home Assistant OS/Supervised

1. Dezarhiveaza folderul `zigbee2mqtt_m1s_zoh_lab` in `/addons` pe hostul Home Assistant.
2. In **Settings > Add-ons > Add-on Store**, deschide meniul si alege **Check for updates**.
3. Deschide **Zigbee2MQTT M1S ZoH LAB**, apasa **Install**, apoi seteaza IP-ul M1S, portul TCP si datele MQTT.
4. Opreste orice alta instanta Zigbee2MQTT care foloseste acelasi coordinator M1S.
5. Porneste add-on-ul LAB si deschide interfata sa pe portul `8099`.

La fiecare pornire, valorile M1S si MQTT din formularul add-on-ului sunt sincronizate automat in `configuration.yaml`. Celelalte optiuni Zigbee2MQTT avansate din fisier sunt pastrate.

Configuratia initiala M1S/TCP provine din kitul `Aqara_M1S_0.1.0_COORDINATOR_LAB_2026-09-22.zip`: `adapter: zoh`, port TCP `1886`, canal `20`.

## Test minim

1. Confirma in log versiunea Zigbee2MQTT 2.14.1 si conectarea la `tcp://IP_M1S:1886` cu adaptorul `zoh`.
2. Activeaza temporar permit join si imperecheaza un singur dispozitiv Aqara.
3. Cauta `[AQARA-JOIN]` in logul add-on-ului.
4. Confirma `[AQARA-LAB8] TRANSPORT_KEY_MAC_EXT`, `[AQARA-LAB9] SRC_MATCH_HOLD`, apoi urmareste LAB 10. La primul `DATA_REQ` cu `queue=1` trebuie sa apara `[AQARA-LAB10] MAC_PROBE_TX` urmat de `[AQARA-LAB10] MAC_PROBE_RESULT ... success=true|false`; cheia trebuie sa ramana in coada (`queueStill=1`). La urmatorul `DATA_REQ` se reia fluxul normal LAB 9 si se incearca `TRANSPORT_KEY`.
5. Dezactiveaza permit join dupa test.

Nu porni doua procese Zigbee coordinator simultan pe acelasi endpoint TCP al M1S.
