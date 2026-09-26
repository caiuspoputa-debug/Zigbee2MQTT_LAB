# LAB 15

- Starts from LAB 13 behavior and keeps LAB 12 forced Frame Pending.
- Replaces the LAB 10 single short-address empty probe with a four-stage MAC ACK matrix.
- Tests SHORT vs EXT addressing independently from small vs 87-byte frame size.
- Keeps the real `TRANSPORT_KEY` queued until all four probes have run.
- Preserves LAB 13 monotonic timing diagnostics for every probe and the final indirect transmission.
- No change to the actual transport-key contents, Zigbee security material, network key, or join authorization logic.

## 2.14.1-lab.15 - 2026-09-26
- Added `SHORT_EMPTY`, `EXT_EMPTY`, `SHORT_87`, and `EXT_87` probe stages.
- Added `[AQARA-LAB15] PROBE_TX/PROBE_ERROR/PROBE_RESULT` logs.
- Actual transport key is attempted only after stage 4.
