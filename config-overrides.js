/* config-overrides.js */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const path = require('path');

function resolvePath(dir) {
    return path.join(__dirname, dir);
}
module.exports = function override(config) {
    config.resolve.alias = {
        '@': resolvePath('src'),
    };
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
        }),

        // 压缩代码
        new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false,
                },
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            include: './src'
        }),

        // gzip
        new CompressionWebpackPlugin({
            test: /\.js$|\.css$/,
            threshold: 1024,
            deleteOriginalAssets: true
        })
    );
    // return config
    return smp.wrap(config);
};
