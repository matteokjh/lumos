/* config-overrides.js */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
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

        // 压缩代码
        new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false
                }
            }
        }),

        // gzip
        new CompressionWebpackPlugin({
            test: /\.js$|\.css$/,
            threshold: 1024,
        })
    );
    return config;
};
