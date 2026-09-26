# LAB 13

- Diagnostic-only timing instrumentation for Aqara sleepy-device join.
- No protocol/addressing/security/timing behavior is intentionally changed.
- Captures monotonic microsecond timestamps from RCP STREAM_RAW receive through MAC DATA_REQ handling, dequeue, direct-send entry, SPINEL STREAM_RAW entry, writer handoff, and SPINEL TX result.
- Emits one consolidated `[AQARA-LAB13] TIMING` line after each PROBE or INDIRECT TX to minimize perturbation of the critical path.
- Keeps LAB 12 force-frame-pending behavior and all prior LAB diagnostics.

# Changelog

## 2.14.1-lab.13 - 2026-09-26
- Temporarily disable RCP MAC source matching during pending association/indirect delivery to force Frame Pending in ACKs to sleepy-child polls.
- Automatically restore source matching after association and indirect queues empty.
- Remove the LAB 11 timing hypothesis: no artificial 5 ms delay.
- Preserve LAB 8/9/10 experimental behavior and diagnostics.
