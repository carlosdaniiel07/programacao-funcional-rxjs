const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const gerarElementos = (array = []) => {
  return {
    iniciar: (fn) => {
      let index = 0

      const intervalo = setInterval(() => {
        if (index >= array.length) {
          clearInterval(intervalo)
        } else {
          fn(array[index])
          index += 1
        }
      }, 1000)

      return {
        parar: () => clearInterval(intervalo)
      }
    }
  }
}

const temp1 = gerarElementos(numeros)
const a = temp1.iniciar(console.log)