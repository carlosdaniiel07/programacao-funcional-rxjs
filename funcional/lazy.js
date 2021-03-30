const lazy = (a) => {
  // Simulação de um processamento 'pesado'
  const end = Date.now() + 2000

  while(Date.now() < end) {}
  
  const value = Math.pow(a, 3)
  
  return (b) => {
    return value + b
  }
}

const lazed = lazy(10)

console.log(lazed(20))
console.log(lazed(30))
console.log(lazed(40))