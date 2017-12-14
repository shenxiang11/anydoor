module.exports = (mime, file) => {
  let icon
  switch (mime) {
    case 'text/plain':
      icon = 'folder'
      break
    case 'text/javascript':
      icon = 'terminal'    
      break
    case 'application/json':
      icon = 'gear'
      break
    case 'text/html':
      icon = 'document'
      break
    default:
      icon = 'file'
  }
  return icon
}