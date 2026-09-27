#!/bin/sh
set -eu

mkdir -p /config

node /usr/local/lib/sync-options.cjs

echo "Starting Zigbee2MQTT M1S ZoH 2.14.1-lab.22 [ROLLBACK-LAB19] exact LAB19 Zigbee code"
exec node /app/index.js
