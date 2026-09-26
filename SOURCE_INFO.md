# Source information

- Zigbee2MQTT: 2.14.1
- zigbee-herdsman: 10.9.2
- zigbee-on-host: 0.2.4
- Experimental package: 2.14.1-lab.18
- Experimental tag: v2.14.1-lab.18
- Base working tree: LAB 17, with LAB 13 timing retained as reference.


LAB 18 delta: remove the one-shot filler probe and preload the real indirect MAC frame as an immutable host-side queue entry before the sleepy-child poll.
The DATA_REQ path transmits that prebuilt payload directly through STREAM_RAW and emits one consolidated `[AQARA-LAB18] FAST_PATH_RESULT` line after TX completion.
This package does not modify the M1S/JN5189 coordinator firmware; if this still misses ACK, the remaining fast-path move must happen inside the RCP/JN5189 firmware or a lower local hub service.
