# Changelog

## 2.14.1-lab.5

- Report the complete MAC transmission error name, message, code and cause details at info level.

## 2.14.1-lab.4

- Fix the add-on startup script to use Linux LF line endings.

## 2.14.1-lab.3

- Add diagnostic markers 8-11 for sleepy-device DATA_REQUEST and indirect frame delivery.
- Keep join and transport behavior unchanged.

## 2.14.1-lab.2

- Synchronize M1S and MQTT options into `configuration.yaml` on every start.
- Preserve advanced Zigbee2MQTT settings while refreshing managed connection fields.

## 2.14.1-lab.1

- Pin the runtime to Zigbee2MQTT 2.14.1, zigbee-herdsman 10.9.2 and zigbee-on-host 0.2.4.
- Add `[AQARA-JOIN]` markers 1-7 without changing join behavior.
- Add first-run M1S/TCP configuration using adapter `zoh`.
