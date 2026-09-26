# Zigbee2MQTT M1S ZoH LAB 15 Experimental

Version: `2.14.1-lab.15`  
Tag: `v2.14.1-lab.15`

LAB 15 isolates the remaining Aqara join failure with a four-step MAC ACK probe matrix before the real `TRANSPORT_KEY` is attempted.

## Probe matrix
Each successive sleepy-child `DATA_REQ` consumes one diagnostic stage while leaving the real transport-key frame queued:

1. `SHORT_EMPTY` — short MAC destination, zero payload, 11-byte frame.
2. `EXT_EMPTY` — IEEE/extended MAC destination, zero payload, 17-byte frame.
3. `SHORT_87` — short MAC destination, filler payload sized to an 87-byte total MAC frame.
4. `EXT_87` — IEEE/extended MAC destination, filler payload sized to an 87-byte total MAC frame.

After stage 4, the next `DATA_REQ` is allowed to send the real LAB 13/LAB 12 transport-key frame unchanged. All probes request a MAC ACK and keep `framePending=true`.

LAB 15 preserves the LAB 12 forced-Frame-Pending behavior, LAB 13 timing instrumentation, LAB 9 source-match hold, LAB 8 extended MAC destination for the actual transport key, and retry-after-`NO_ACK`.

Key log markers:
```
[AQARA-LAB15] PROBE_TX stage=1/4 name=SHORT_EMPTY ...
[AQARA-LAB15] PROBE_RESULT stage=1/4 name=SHORT_EMPTY ... success=...
[AQARA-LAB15] PROBE_TX stage=2/4 name=EXT_EMPTY ...
[AQARA-LAB15] PROBE_TX stage=3/4 name=SHORT_87 ...
[AQARA-LAB15] PROBE_TX stage=4/4 name=EXT_87 ...
[AQARA-LAB13] TIMING kind=LAB15_* ...
```

Interpretation:
- SHORT succeeds / EXT fails => MAC extended-destination path is the differentiator.
- Small succeeds / 87-byte probe fails => frame length/timing/radio handling is the differentiator.
- All four probes succeed but the transport key fails => problem is specific to the real NWK/APS/security frame construction, not generic MAC delivery.
