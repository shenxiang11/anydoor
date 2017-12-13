const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const handlebars = require('handlebars')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')
const ip = require('./ip')

const tplPath = path.join(__dirname, '../templete/dir.html')
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, conf) {
  try {
    const stats = await stat(filePath)

    if (stats.isFile()) {
      res.setHeader('Content-Type', mime(filePath))
      
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }
      
      let rs
      const {code, start, end} = range(stats.size, req, res)

      if (code === 200) {
        res.statusCode = 200        
        rs = fs.createReadStream(filePath)        
      } else {
        res.statusCode = 206        
        rs = fs.createReadStream(filePath, {start, end})
      }
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(conf.root, filePath)
      const data = {
        ip: `${ip}:${conf.port}`,        
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.error(ex)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not exist!`)
  }
}