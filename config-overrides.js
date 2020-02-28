/* config-overrides.js */
const path = require('path');
function resolvePath(dir) {
    return path.join(__dirname, dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolvePath('src')
    }
    return config;
}