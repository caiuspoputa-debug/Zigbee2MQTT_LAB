# Zigbee2MQTT M1S ZoH LAB 18 Experimental

Version: `2.14.1-lab.18`  
Tag: `v2.14.1-lab.18`

LAB 18 tests host-side local indirect fast-path / preloading for Aqara sleepy-device join.

## Experimental change
LAB 18 keeps the known LAB13 timing baseline and changes one functional variable: the real indirect MAC frame is copied into a preloaded host-side queue entry before the sleepy child polls. When `DATA_REQ` arrives, ZoH sends that already-built payload directly through `STREAM_RAW`, instead of calling a deferred closure that re-enters the normal direct-send path.

The LAB17 one-shot 87-byte filler probe is removed, so the test observes the real queued indirect frame only. LAB18 still cannot move the queue into JN5189 firmware because this add-on only patches Zigbee2MQTT / zigbee-on-host JavaScript; the package is intentionally designed to prove whether host-side preloading is enough, or whether the remaining logic must move into RCP/JN5189.

Key log marker:
```
[AQARA-LAB18] PRELOADED ...
[AQARA-LAB18] FAST_PATH_RESULT ...
```

Success target:
```
[AQARA-LAB12] FORCE_FRAME_PENDING active=true sourceMatchEnabled=false
[AQARA-LAB18] PRELOADED ... bytes=87 ...
[AQARA-LAB18] FAST_PATH_RESULT ... success=true
[AQARA-JOIN] 5 AUTHORIZED
[AQARA-JOIN] 6 DEVICE_ANNCE
[AQARA-JOIN] 7 DEVICE_JOINED_CALLBACK
```

## LAB 18
Single-variable experiment based on LAB17/LAB13: remove the synthetic filler probe and preload the real indirect frame before poll. No firmware flashing, no coordinator firmware changes, no artificial delay, and no heavy logging before TX.
