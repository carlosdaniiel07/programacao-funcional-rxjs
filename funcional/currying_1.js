const textWithLengthBetween = (min, max, err, text = '') => {
  const length = text.trim().length

  if (length < min || length > max) {
    throw err
  }
}

const p1 = {
  name: 'A',
  price: 14.99,
}

textWithLengthBetween(4, 255, 'Nome inválido', p1.name)