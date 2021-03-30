const eager = (a, b) => {
  // Simulação de um processamento 'pesado'
  const end = Date.now() + 2000

  while(Date.now() < end) {}
  
  const value = Math.pow(a, 3)
  return value + b
}

console.log(eager(10, 20))
console.log(eager(10, 30))
console.log(eager(10, 40))