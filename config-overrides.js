/* config-overrides.js */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
const path = require('path');

function resolvePath(dir) {
    return path.join(__dirname, dir);
}
module.exports = function override(config) {
    // alias
    config.resolve.alias = {
        '@': resolvePath('src'),
    };

    // plugin
    config.plugins.push(
        // monaco
        new MonacoWebpackPlugin({
            languages: [
                'json',
                'markdown',
                'css',
                'html',
                'scss',
                'java',
                'cpp',
                'typescript',
                'javascript',
            ],
        })
    );

    // 压缩代码
    const minimizer = config.optimization.minimizer
    const tp = minimizer.find(e => e.constructor.name === "TerserPlugin")
    tp.options.terserOptions.compress.drop_console = true
    
    return config;
    // return smp.wrap(config);
};
