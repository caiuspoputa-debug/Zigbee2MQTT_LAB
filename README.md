# Zigbee2MQTT M1S ZoH LAB

Add-on local Home Assistant bazat pe Zigbee2MQTT 2.14.1, cu:

- zigbee-herdsman 10.9.2;
- zigbee-on-host 0.2.4;
- conexiune M1S prin `tcp://IP_M1S:1886`, cu `adapter: zoh`;
- sapte diagnostice `[AQARA-JOIN]` pentru asociere, cheia de transport, autorizare, Device_annce si callback-ul de join.

Fluxul Zigbee de join nu este schimbat. Cele doua fisiere din `patches` contin doar cele sapte apeluri noi `logger.info`.

## Instalare minima in Home Assistant OS/Supervised

1. Dezarhiveaza folderul `zigbee2mqtt_m1s_zoh_lab` in `/addons` pe hostul Home Assistant.
2. In **Settings > Add-ons > Add-on Store**, deschide meniul si alege **Check for updates**.
3. Deschide **Zigbee2MQTT M1S ZoH LAB**, apasa **Install**, apoi seteaza IP-ul M1S, portul TCP si datele MQTT.
4. Opreste orice alta instanta Zigbee2MQTT care foloseste acelasi coordinator M1S.
5. Porneste add-on-ul LAB si deschide interfata sa pe portul `8099`.

La prima pornire se creeaza `configuration.yaml` in folderul de configurare al add-on-ului. Schimbarile ulterioare din formular nu suprascriu fisierul; pentru optiuni Zigbee2MQTT avansate, editeaza direct acel fisier.

Configuratia initiala M1S/TCP provine din kitul `Aqara_M1S_0.1.0_COORDINATOR_LAB_2026-09-22.zip`: `adapter: zoh`, port TCP `1886`, canal `20`.

## Test minim

1. Confirma in log versiunea Zigbee2MQTT 2.14.1 si conectarea la `tcp://IP_M1S:1886` cu adaptorul `zoh`.
2. Activeaza temporar permit join si imperecheaza un singur dispozitiv Aqara.
3. Cauta `[AQARA-JOIN]` in logul add-on-ului.
4. Pentru un join nou, urmareste marcajele 1-7. Pe unele cai de rejoin, marcajul 7 poate lipsi legitim deoarece este folosit callback-ul de rejoin.
5. Dezactiveaza permit join dupa test.

Nu porni doua procese Zigbee coordinator simultan pe acelasi endpoint TCP al M1S.
