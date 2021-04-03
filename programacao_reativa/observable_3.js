// desafio!
// Criar uma stream de números passando o valor minimo e o valor máximo

const { Observable } = require('rxjs')

const between = (min = 0, max = 0) => {
  return new Observable(subscriber => {
    for (let i = min; i <= max; i++) {
      subscriber.next(i)
    }

    subscriber.complete()
  })
}

between(4, 10)
  .subscribe((num) => {
    console.log(`Número => ${num}`)
  })