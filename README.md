# Zigbee2MQTT M1S ZoH LAB 12 Experimental

Version: `2.14.1-lab.12`  
Tag: `v2.14.1-lab.12`

LAB 12 tests forced MAC Frame Pending during Aqara sleepy-device join.

## Experimental change
While a MAC association is pending or the child has indirect traffic queued, LAB 12 temporarily disables `MAC_SRC_MATCH_ENABLED`. On OpenThread RCP this forces the Frame Pending bit in ACKs to MAC Data Requests. Once the association and indirect queue are empty, source matching is automatically re-enabled.

LAB 12 preserves LAB 8/9/10 behavior, including extended MAC destination for the transport key, retry after `NO_ACK`, IEEE+short source-match bookkeeping, and the LAB 10 one-shot MAC probe. The LAB 11 artificial 5 ms delay is not used.

Key log marker:
```
[AQARA-LAB12] FORCE_FRAME_PENDING active=true sourceMatchEnabled=false ...
```

Success target:
```
[AQARA-LAB12] FORCE_FRAME_PENDING active=true sourceMatchEnabled=false
[AQARA-JOIN] 9 DATA_REQ ...
[AQARA-JOIN] 11 INDIRECT_TX_RESULT ... success=true
[AQARA-JOIN] 5 AUTHORIZED
[AQARA-JOIN] 6 DEVICE_ANNCE
[AQARA-JOIN] 7 DEVICE_JOINED_CALLBACK
```
