const pkg = require('./package.json')

exports.name = `[${pkg.name}]本地环境配置`
exports.rules = `
local.whistle.com 127.0.0.1:8899
local.lumos.com 127.0.0.1:8080
api.lumos.com 192.168.99.100:3000
`
