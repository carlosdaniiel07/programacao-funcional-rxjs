const fs = require('fs')
const path = require('path')

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, null, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data.toString())
    })
  })
}

readFile(path.resolve(__dirname, 'ssss.txt'))
  .then(console.log)
  .catch(() => console.error('erro'))