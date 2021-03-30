const path = require('path')
const fn = require('./functions')

const main = async () => {
  console.time('start-app')

  const dataDirectory = path.resolve(__dirname, 'data')
  const resultFilePath = path.resolve(__dirname, 'data', 'resultado.json')

  const files = [...await fn.getFilesByDirectory(dataDirectory)]
  const subtitleFiles = files.filter(fn.isSubtitleFile)

  const promises = subtitleFiles.map(file => fn.readFile(path.resolve(dataDirectory, file)))

  Promise.all(promises)
    .then(fn.removeHtmlTags)
    .then(fn.removePunctuation)
    .then(fn.splitByEmptyLine)
    .then(fn.getWordsByFiles)
    .then(fn.sumWords)
    .then(fn.buildResultFile(resultFilePath))
    .then(() => {
      console.log(`[!] Resultado gerado com sucesso em: ${resultFilePath}`)
      console.timeEnd('start-app')
    })
}

main()