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

const applyValidation = (fn) => {
  return (value) => {
    try {
      fn(value)
    } catch (err) {
      return { err }
    }
  }
}

const product = {
  name: 'A',
  price: 14.99,
}

const otherProduct = {
  name: 'BAAA',
  price: 132.23,
}

const forceDefaultLength = textWithLengthBetween(4)(255)
const forceProductNameValid = forceDefaultLength('Nome do produto inválido')
const validate = applyValidation(forceProductNameValid)

console.log(validate(product.name))
console.log(validate(otherProduct.name))
