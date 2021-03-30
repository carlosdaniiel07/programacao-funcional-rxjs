const randomNumber = (min = 0, max) => {
  return parseInt(Math.random() * (max - min + 1)) + min
}

console.log(randomNumber(5, 6))
console.log(randomNumber(5, 6))
console.log(randomNumber(5, 6))
console.log(randomNumber(5, 6))