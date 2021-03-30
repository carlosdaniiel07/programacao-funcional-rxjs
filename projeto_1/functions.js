const fs = require('fs')

const compose = (...fns) => {
  return (value) => {
    return fns.reduce(async (acc, fn) => {
      const isPromise = Promise.resolve(acc) === acc

      if (isPromise) {
        return fn(await acc)
      }

      return fn(acc)
    }, value)
  }
}

const getFilesByDirectory = directory => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, {}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}

const createFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const isSubtitleFile = file => {
  const fileExtension = 'srt'
  return file.endsWith(fileExtension)
}

const extractWords = (content = '') => {
  const isSubtitleSentence = (_, index) => index >= 2

  const sentences = content
    .split('\n')
    .map(removeSpaces)
    .filter(isSubtitleSentence)
  const words = []

  sentences.forEach(sentence => words.push(...sentence.split(' ')))

  return words
}

const getWordsByFiles = (files = []) => {
  const words = []

  files.forEach(fileContents => {
    fileContents.forEach(content => {
      words.push(...extractWords(content))
    })
  })

  return words
}

const sumWords = (words = []) => {
  const result = new Map()

  words.forEach(word => {
    const wordFormated = word.toLowerCase()
    const currentQty = result.get(wordFormated) || 0

    result.set(wordFormated, currentQty + 1)
  })

  return result
}

const sortDesc = (a, b) => b - a

const buildResultFile = (path) => {
  return (result = new Map()) => {
    const arrayResult = []

    result.forEach((value, key) => arrayResult.push({
      word: key,
      qty: Number(value),
    }))

    const sortedArrayResult = arrayResult.sort((a, b) => sortDesc(a.qty, b.qty))

    return createFile(path, JSON.stringify(sortedArrayResult))
  }
}

const splitByEmptyLine = (data = []) => {
  const regex = /\n\s*\n/

  return data.map(content => content.split(regex))
}

const removeHtmlTags = (data = []) => {
  const regex = /<[^>]*>/g

  return data.map(content => content.replace(regex, ''))
}

const removePunctuation = (data = []) => {
  const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g

  return data.map(content => content.replace(regex, ''))
}

const removeSpaces = (content) => content?.trim()

module.exports = {
  compose,
  getFilesByDirectory,
  readFile,
  createFile,
  isSubtitleFile,
  extractWords,
  getWordsByFiles,
  sumWords,
  sortDesc,
  buildResultFile,
  splitByEmptyLine,
  removeHtmlTags,
  removePunctuation,
  removeSpaces,
}