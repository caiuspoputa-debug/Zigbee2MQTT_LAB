# Zigbee2MQTT M1S ZoH LAB Experimental

Add-on local Home Assistant bazat pe Zigbee2MQTT 2.14.1, cu:

- zigbee-herdsman 10.9.2;
- zigbee-on-host 0.2.4;
- conexiune M1S prin `tcp://IP_M1S:1886`, cu `adapter: zoh`;
- unsprezece diagnostice `[AQARA-JOIN]`, inclusiv cererea de date si livrarea indirecta pentru dispozitivele pe baterie.
- remediere experimentala pentru sincronizarea asocierilor si a cozii indirecte cu listele MAC source-match ale RCP-ului;
- retransmiterea cadrului indirect la urmatorul DATA_REQUEST atunci cand transmisia primeste NO_ACK.

LAB 9 pastreaza integral adresarea si retransmiterea din LAB 8 si mentine simultan intrarile IEEE + short in `MAC_SRC_MATCH` cat timp exista un `TRANSPORT_KEY` in coada indirecta. Intrarea IEEE nu mai dispare imediat dupa `ASSOC_RSP`; este eliminata abia dupa golirea cozii.

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
4. Confirma `[AQARA-LAB8] TRANSPORT_KEY_MAC_EXT`, apoi verifica `[AQARA-JOIN] RCP_SRC_MATCH` si `[AQARA-LAB9] SRC_MATCH_HOLD`. Dupa `TRANSPORT_KEY_SENT`, lista trebuie sa arate simultan `short=<nwk>` si `extended=<ieee>` cat timp `queue=1`. Succesul asteptat este `INDIRECT_TX_RESULT ... success=true`, urmat de marcajele 5-7.
5. Dezactiveaza permit join dupa test.

Nu porni doua procese Zigbee coordinator simultan pe acelasi endpoint TCP al M1S.
