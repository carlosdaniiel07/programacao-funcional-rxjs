const TipoSeguro = (value) => {
  return {
    value,
    map(fn) {
      const newValue = fn(this.value)
      return TipoSeguro(newValue)
    },
    flatMap(fn) {
      return this.map(fn).value
    }
  }
}

const result = TipoSeguro('Esse é um texto')
  .map(text => text.toUpperCase())
  .flatMap(text => `${text}!`)

console.log(result)