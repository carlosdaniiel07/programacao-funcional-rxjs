const textWithLengthBetween = (min) => {
  return (max) => {
    return (err) => {
      return (text = '') => {
        const length = text.trim().length

        if (length < min || length > max) {
          throw err
        }
      }
    }
  }
}

const forceDefaultLength = textWithLengthBetween(4)(255)
const forceProductNameValid = forceDefaultLength('Nome do produto inválido')

const product = {
  name: 'A',
  price: 14.99,
}

forceDefaultLength('Nome inválido')(product.name)
forceProductNameValid(product.name)