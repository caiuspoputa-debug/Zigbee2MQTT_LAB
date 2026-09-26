#!/bin/sh
set -eu

OPTIONS=/data/options.json
CONFIG=/config/configuration.yaml

mkdir -p /config

if [ ! -f "$CONFIG" ]; then
    m1s_host=$(jq -r '.m1s_host' "$OPTIONS")
    m1s_port=$(jq -r '.m1s_port' "$OPTIONS")
    mqtt_server=$(jq -r '.mqtt_server | @json' "$OPTIONS")
    mqtt_user=$(jq -r '.mqtt_user // ""' "$OPTIONS")
    mqtt_password=$(jq -r '.mqtt_password // ""' "$OPTIONS")
    channel=$(jq -r '.channel' "$OPTIONS")
    permit_join=$(jq -r '.permit_join' "$OPTIONS")

    cat > "$CONFIG" <<EOF
version: 5
mqtt:
  server: $mqtt_server
serial:
  port: tcp://${m1s_host}:${m1s_port}
  adapter: zoh
advanced:
  channel: ${channel}
  log_level: info
frontend:
  enabled: true
  port: 8080
homeassistant:
  enabled: true
permit_join: ${permit_join}
EOF

    if [ -n "$mqtt_user" ]; then
        mqtt_user_json=$(printf '%s' "$mqtt_user" | jq -Rs .)
        mqtt_password_json=$(printf '%s' "$mqtt_password" | jq -Rs .)
        sed -i "/^  server:/a\\  user: ${mqtt_user_json}\n  password: ${mqtt_password_json}" "$CONFIG"
    fi

    echo "Created initial configuration at $CONFIG"
fi

echo "Starting Zigbee2MQTT M1S ZoH LAB (instrumentation only)"
exec node /app/index.js
