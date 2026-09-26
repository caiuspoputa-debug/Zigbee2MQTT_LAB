# Changelog

## 2.14.1-lab.12 - 2026-09-26
- Temporarily disable RCP MAC source matching during pending association/indirect delivery to force Frame Pending in ACKs to sleepy-child polls.
- Automatically restore source matching after association and indirect queues empty.
- Remove the LAB 11 timing hypothesis: no artificial 5 ms delay.
- Preserve LAB 8/9/10 experimental behavior and diagnostics.
