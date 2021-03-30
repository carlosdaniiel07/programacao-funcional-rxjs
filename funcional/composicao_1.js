const composicao = (...fns) => {
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

const gritar = (value = '') => value.toUpperCase()

const enfatizar = (value = '') => `${value}!!!`

const lento = (value = '') => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value.split('').join(' ')), 3000)
  })
}

const exagerado = composicao(
  gritar,
  enfatizar,
  lento,
)

exagerado('Olá').then(console.log)