# LAB 13

- Diagnostic-only timing instrumentation for Aqara sleepy-device join.
- No protocol/addressing/security/timing behavior is intentionally changed.
- Captures monotonic microsecond timestamps from RCP STREAM_RAW receive through MAC DATA_REQ handling, dequeue, direct-send entry, SPINEL STREAM_RAW entry, writer handoff, and SPINEL TX result.
- Emits one consolidated `[AQARA-LAB13] TIMING` line after each PROBE or INDIRECT TX to minimize perturbation of the critical path.
- Keeps LAB 12 force-frame-pending behavior and all prior LAB diagnostics.

# Changelog

## 2.14.1-lab.18 - 2026-09-26
- Based on LAB 17 archive, with LAB 13 timing kept as the measurement baseline.
- Removes the LAB 17 one-shot 87-byte filler probe; LAB18 sends only the real queued indirect frame.
- Preloads each indirect frame as an immutable host-side entry (`seqNum`, payload copy, destination, timestamp) before the child poll.
- On MAC `DATA_REQ`, the hot path sends the already-built payload locally through ZoH/STREAM_RAW and logs one post-TX `[AQARA-LAB18] FAST_PATH_RESULT` line.
- No coordinator firmware change and no unrelated Zigbee behavior change.

## 2.14.1-lab.13 - 2026-09-26
- Temporarily disable RCP MAC source matching during pending association/indirect delivery to force Frame Pending in ACKs to sleepy-child polls.
- Automatically restore source matching after association and indirect queues empty.
- Remove the LAB 11 timing hypothesis: no artificial 5 ms delay.
- Preserve LAB 8/9/10 experimental behavior and diagnostics.


## 2.14.1-lab.17
- Based strictly on LAB 13.
- Changes only the one-shot SHORT probe payload from 0 bytes to 76 bytes of 0xA5 (87-byte MAC frame total).
- No addressing, security, source-match, frame-pending, indirect-queue, or timing changes.
# 2.14.1-lab.19 - 2026-09-26

- Single functional change: register pending APS ACK before the first unfragmented MAC send; start its timeout only after MAC completes.
- An early ACK can now resolve the pending entry instead of being discarded. MAC failures clean up the entry.
- Retry counts, timeout duration, fragmentation, LAB18 indirect path and replay protection are unchanged. Coordinator firmware is untouched.
- Startup explicitly identifies LAB19. Simulated regression reproduces early-ACK failure in LAB18 and passes in LAB19.
- Field log confirms RTCGQ11LM interview and reporting, but does not prove this race caused its slow interview or that LAB18 fast-path was exercised.
