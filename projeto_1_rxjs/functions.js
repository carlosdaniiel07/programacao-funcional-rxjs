const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')

const createPipeableOperator = (fn) => {
  return (sourceObservable) => {
    return new Observable((subscriber) => {
      sourceObservable.subscribe({
        ...fn(subscriber),
      })
    })
  }
}

// const getFilesByDirectory = directory => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(directory, {}, (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }

const getFilesByDirectory = directory => {
  return new Observable(subscriber => {
    try {
      fs.readdirSync(directory, {}).forEach(file => {
        subscriber.next(path.join(directory, file))
      })

      subscriber.complete()
    } catch (err) {
      subscriber.error(err)
    }
  })
}

// const readFile = path => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, {}, (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data.toString())
//       }
//     })
//   })
// }

const readFile = () => {
  return createPipeableOperator((subscriber) => ({
    next: (path) => {
      fs.readFile(path, {}, (err, data) => {
        subscriber.next(data.toString())
      })
    }
  }))
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

// const isSubtitleFile = file => {
//   const fileExtension = 'srt'
//   return file.endsWith(fileExtension)
// }

const isSubtitleFile = () => {
  const fileExtension = 'srt'

  return createPipeableOperator((subscriber) => ({
    next: (value) => {
      if (value.endsWith(fileExtension)) {
        subscriber.next(value)
      }
    },
  }))
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

// const getWordsByFiles = (files = []) => {
//   const words = []

//   files.forEach(fileContents => {
//     fileContents.forEach(content => {
//       words.push(...extractWords(content))
//     })
//   })

//   return words
// }

const getWordsByFiles = () => {
  return createPipeableOperator((subscriber) => ({
    next: (content) => {
      const words = []

      content.forEach((line) => {
        words.push(...extractWords(line))
      })

      subscriber.next(words)
    }
  }))
}

// const sumWords = (words = []) => {
//   const result = new Map()

//   words.forEach(word => {
//     const wordFormated = word.toLowerCase()
//     const currentQty = result.get(wordFormated) || 0

//     result.set(wordFormated, currentQty + 1)
//   })

//   return result
// }

const sumWords = () => {
  return createPipeableOperator((subscriber) => ({
    next: (words) => {
      const result = new Map()

      words.forEach((word) => {
        const wordFormated = word.toLowerCase()
        const currentQty = result.get(wordFormated) || 0

        result.set(wordFormated, currentQty + 1)
      })

      subscriber.next(result)
    }
  }))
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


// const splitByEmptyLine = (data = []) => {
//   const regex = /\n\s*\n/

//   return data.map(content => content.split(regex))
// }

const splitByEmptyLine = () => {
  const regex = /\n\s*\n/

  return createPipeableOperator((subscriber) => ({
    next: (content) => {
      subscriber.next(content.split(regex))
    }
  }))
}

// const removeHtmlTags = (data = []) => {
//   const regex = /<[^>]*>/g

//   return data.map(content => content.replace(regex, ''))
// }

const removeHtmlTags = () => {
  const regex = /<[^>]*>/g

  return createPipeableOperator((subscriber) => ({
    next: (content) => {
      subscriber.next(content.replace(regex, ''))
    }
  }))
}

// const removePunctuation = (data = []) => {
//   const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g

//   return data.map(content => content.replace(regex, ''))
// }

const removePunctuation = () => {
  const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g

  return createPipeableOperator((subscriber) => ({
    next: (content) => {
      subscriber.next(content.replace(regex, ''))
    }
  }))
}


const removeSpaces = (content) => content?.trim()

module.exports = {
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