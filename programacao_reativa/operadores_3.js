const { Observable } = require('rxjs')
const { concatAll } = require('rxjs/operators')

const myOfOperator = (...params) => {
  return new Observable(subscriber => {
    params.forEach((param, index)=> {
      subscriber.next(param)
      index + 1 === params.length && subscriber.complete()
    })
  })
}

myOfOperator('Carlos', 'Daniel', 'Fulano', 'Ciclano', 'Outro nome', 'Mais um')
  .subscribe(console.log)