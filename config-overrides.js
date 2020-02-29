/* config-overrides.js */
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require('path');
function resolvePath(dir) {
    return path.join(__dirname, dir)
}
module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': resolvePath('src')
    }
    config.plugins.push(
        new MonacoWebpackPlugin({
            languages: [
                "json",
                "markdown",
                "css",
                "html",
                "scss"
            ]
        })
    );
    return config;
}