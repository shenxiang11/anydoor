const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config)
    console.log(this.conf)
  }

  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      route(req, res, filePath, this.conf)
    })
    
    server.listen(this.conf.port, this.conf.hostname, _ => {
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`Server start at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}

module.exports = Server