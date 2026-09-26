const fs = require("node:fs");
const yaml = require("/app/node_modules/js-yaml");

const optionsPath = "/data/options.json";
const configPath = "/config/configuration.yaml";
const options = JSON.parse(fs.readFileSync(optionsPath, "utf8"));

let config = {};
if (fs.existsSync(configPath)) {
    config = yaml.load(fs.readFileSync(configPath, "utf8")) || {};
}

config.version ??= 5;
config.mqtt = {
    ...(config.mqtt || {}),
    server: options.mqtt_server,
};

if (options.mqtt_user) {
    config.mqtt.user = options.mqtt_user;
    config.mqtt.password = options.mqtt_password || "";
} else {
    delete config.mqtt.user;
    delete config.mqtt.password;
}

config.serial = {
    ...(config.serial || {}),
    port: `tcp://${options.m1s_host}:${options.m1s_port}`,
    adapter: "zoh",
};
config.advanced = {
    ...(config.advanced || {}),
    channel: options.channel,
    log_level: config.advanced?.log_level || "info",
};
config.frontend ??= {enabled: true, port: 8080};
config.homeassistant ??= {enabled: true};
config.permit_join = options.permit_join;

fs.writeFileSync(configPath, yaml.dump(config, {lineWidth: 120, noRefs: true}), {mode: 0o600});
console.log(`Synced add-on options to ${configPath} (MQTT user: ${options.mqtt_user || "<empty>"})`);
