// Os dois tipos de operadores:
// 1. Operadores de criação
// 2. Operadores encadeáveis (Pipeable operators)

const { of, from, Observable } = require('rxjs') // criação
const { last, first, map } = require('rxjs/operators') // encadeáveis

of(1, 2, 3, 4, 5)
  .subscribe(subscriber => console.log(subscriber))

of(1, 2, 3, 4, 5).pipe(
  last()
)
  .subscribe(last => console.log(`Último valor => ${last}`))

const isPar = (valor = 0) => valor % 2 === 0

of(1, 2, 3, 4, 5).pipe(
  last(isPar)
)
  .subscribe(last => console.log(`Último valor par => ${last}`))


const observable = (min, max) => {
  return new Observable((subscriber) => {
    for (let i = min; i <= max; i++) {
      subscriber.next(i)
    }

    subscriber.complete()
  })
}

observable(1, 99)
  .pipe(
    first(isPar)
  )
  .subscribe((lastValue) => console.log(`Primeiro valor par => ${lastValue}`))

of('Carlos', 'Daniel', 'Martins')
  .pipe(
    last(),
    map(name => name[0])
  )
  .subscribe(console.log)

from(['Carlos', 'Daniel', 'Martins'])
  .pipe(
    last(),
    map(name => name[0])
  )
  .subscribe(console.log)