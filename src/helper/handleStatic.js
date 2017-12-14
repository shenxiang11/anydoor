const path = require('path')
const fs = require('fs')

module.exports = (html) => {
  const reg = /<!--\s*wondergate:load\s*(.*)\s*-->/g
  const matches = html.match(reg)
  if (matches) {
    matches.forEach((item) => {
      const stringToReplace = item
      const resource = path.join(__dirname, item.replace(reg, '$1')).trim()
      let label = ''
      if (/.js/.test(stringToReplace)) {
        label = 'script'
      } else if (/.css/.test(stringToReplace)) {
        label = 'style'
      }
      html = html.replace(stringToReplace, `<${label}> ${fs.readFileSync(resource).toString()} </${label}>`)
    })
  }
  return html
}