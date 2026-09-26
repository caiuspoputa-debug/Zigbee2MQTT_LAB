# Changelog

## 2.14.1-lab.9

- Keep the IEEE source-match entry active while a joining sleepy device still has queued indirect traffic.
- Build the RCP extended source-match list from both pending associations and non-empty indirect-transmission queues.
- Keep the short source-match entry active in parallel, so LAB 8 MAC-extended `TRANSPORT_KEY` can be retried without dropping the joining device IEEE match.
- Remove both source-match entries naturally after successful delivery empties the indirect queue.
- Add `[AQARA-LAB9] SRC_MATCH_HOLD` diagnostics; preserve all LAB 8 join/retry/addressing behavior.

## 2.14.1-lab.8

- Keep APS/NWK destination on the assigned short address while encoding the initial NWK `TRANSPORT_KEY` MAC frame with the joining device IEEE destination.
- Use the generic MAC encoder only for direct unicast `TRANSPORT_KEY` frames with an IEEE destination; all other APS command traffic keeps the LAB 7 short-address MAC path.
- Add `[AQARA-LAB8] TRANSPORT_KEY_MAC_EXT` diagnostic logging with NWK, IEEE, route16 and MAC sequence.
- Preserve LAB 7 source-match handling and retry-on-NO_ACK behavior.

## 2.14.1-lab.7

- Populate the RCP extended source-match list before the association-response poll.
- Keep the short source-match list for transport-key delivery after association.

## 2.14.1-lab.6

- Enable the RCP MAC source-match table for sleepy children with queued frames.
- Keep failed indirect frames queued so a later data request can retry delivery.
- Experimental functional fix for Aqara transport-key delivery after association.

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
