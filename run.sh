#!/bin/sh
set -eu

mkdir -p /config

node /usr/local/lib/sync-options.cjs

echo "Starting Zigbee2MQTT M1S ZoH 2.14.1-lab.19 [AQARA-LAB19] APS early-ACK fix"
exec node /app/index.js
