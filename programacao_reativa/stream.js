const gerarNumeros = () => {
  return {
    iniciar: (fn) => {
      let num = 0

      const intervalo = setInterval(() => {
        fn(num++)
      }, 1000);
      
      return {
        parar: () => clearInterval(intervalo)
      }
    }
  }
}

const temp1 = gerarNumeros()
const temp2 = gerarNumeros()

const exec1 = temp1.iniciar(a => {
  console.log(`#1: ${a * 2}`)
})


const exec2 = temp2.iniciar(b => {
  console.log(`#2: ${b  + 100}`)
})

setTimeout(() => exec1.parar(), 10000)