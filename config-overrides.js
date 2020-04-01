/* config-overrides.js */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');

function resolvePath(dir) {
    return path.join(__dirname, dir);
}
module.exports = function override(config) {
    config.resolve.alias = {
        '@': resolvePath('src'),
    };
    config.plugins.push(
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
        }),
        // 去除 console
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_debugger: true,
                    drop_console: true,
                }
            },
        }),
        // gzip
        new CompressionWebpackPlugin({
            test: /\.js$|\.css$/,
            threshold: 1024,
        })
    );
    return config;
};
