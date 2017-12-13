const internalIp = require('internal-ip');

let ip = internalIp.v4.sync()

module.exports = ip