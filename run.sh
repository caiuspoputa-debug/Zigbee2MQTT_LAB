#!/bin/sh
set -eu

mkdir -p /config

node /usr/local/lib/sync-options.cjs

echo "Starting Zigbee2MQTT M1S ZoH LAB (instrumentation only)"
exec node /app/index.js
