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
    .then(
      fn.compose(
        fn.removeHtmlTags,
        fn.removePunctuation,
        fn.splitByEmptyLine,
        fn.getWordsByFiles,
        fn.sumWords,
        fn.buildResultFile(resultFilePath),
        () => {
          console.log(`[!] Resultado gerado com sucesso em: ${resultFilePath}`)
          console.timeEnd('start-app')
        },
      )
    )
}

main()