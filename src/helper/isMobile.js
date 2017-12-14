module.exports = (req) => {
  let ua = req.headers['user-agent']

  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true

  for (var v = 0; v < Agents.length; v++) {
    if (ua.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }

  return flag
}