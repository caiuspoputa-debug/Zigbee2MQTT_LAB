# Zigbee2MQTT M1S ZoH LAB 16 Experimental

Version: `2.14.1-lab.16`  
Tag: `v2.14.1-lab.16`

LAB 16 is a single-variable follow-up to LAB 13. LAB 13 proved that the one-shot 11-byte SHORT-destination MAC probe can be ACKed by the Aqara sleepy device. LAB 16 keeps the same one-shot probe path and changes only the MAC destination addressing mode to EXT/IEEE.

## Experimental change
The first post-association poll with an indirect TRANSPORT_KEY queued sends one empty MAC DATA probe with:

- destination mode: EXT / IEEE
- destination IEEE: joining Aqara device
- source mode: SHORT / coordinator 0x0000
- ACK request: true
- Frame Pending: true
- payload: 0 bytes
- expected frame length: 17 bytes

The real TRANSPORT_KEY remains queued and is attempted on the next poll exactly as in LAB 13. LAB 12 force-frame-pending behavior and LAB 13 timing instrumentation remain unchanged.

Important: the pre-TX probe log line remains the existing `[AQARA-LAB10] MAC_PROBE_TX` line so the critical path is changed as little as possible. LAB 16 identifies the outcome with the post-TX marker:

```
[AQARA-LAB16] EXT_EMPTY_RESULT ... success=true|false
```

Interpretation:
- `success=true`: EXT addressing itself is valid; next useful test is a large SHORT probe.
- `success=false` with a fast `raw_to_writer_us`: EXT addressing is the likely differentiator versus LAB 13.
- `success=false` with a much slower `raw_to_writer_us`: repeat before attributing failure to addressing, because the poll receive window may have been missed.
