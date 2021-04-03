const { of, from, Observable } = require('rxjs')

const createPipeableOperator = (fn) => {
  return (sourceObservable) => {
    return new Observable((subscriber) => {
      fn(sourceObservable, subscriber)
    })
  }
}

const myFirst = () => {
  return createPipeableOperator((sourceObservable, subscriber) => {
    sourceObservable.subscribe({
      next: (value) => {
        subscriber.next(value)
        subscriber.complete()
      },
    })
  })
}

const myLast = () => {
  return createPipeableOperator((sourceObservable, subscriber) => {
    let lastValue = null

    sourceObservable.subscribe({
      next: (value) => (lastValue = value),
      complete: () => {
        subscriber.next(lastValue)
        subscriber.complete()
      }
    })
  })
}

const endsWith = (param = '') => {
  return createPipeableOperator((sourceObservable, subscriber) => {
    sourceObservable.subscribe({
      next: (value) => value.endsWith(param) && subscriber.next(value),
      complete: () => subscriber.complete()
    })
  })
}

from([1, 2, 3, 4, 5])
  .pipe(
    // myFirst(),
    myLast()
  )
  .subscribe(console.log)

of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
  .pipe(
    endsWith('Silva')
  )
  .subscribe(console.log)