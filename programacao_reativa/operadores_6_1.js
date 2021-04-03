const { of, from, Observable } = require('rxjs')

const createPipeableOperator = (fn) => {
  return (sourceObservable) => {
    return new Observable((subscriber) => {
      sourceObservable.subscribe({
        complete: () => subscriber.complete(),
        error: (err) => subscriber.error(err),
        ...fn(subscriber)
      })
    })
  }
}

const myFirst = () => {
  return createPipeableOperator((subscriber) => ({
    next: (value) => {
      subscriber.next(value)
      subscriber.complete()
    }
  }))
}

const myLast = () => {
  return createPipeableOperator((subscriber) => {
    let lastValue = null

    return {
      next: (value) => (lastValue = value),
      complete: () => {
        subscriber.next(lastValue)
        subscriber.complete()
      },
    }
  })
}

const endsWith = (value) => {
  return createPipeableOperator((subscriber) => ({
    next: (currentValue) => currentValue.endsWith(value) && subscriber.next(currentValue),
  }))
}

from([1, 2, 3, 4, 5])
  .pipe(
    myFirst()
  )
  .subscribe(console.log)

from([1, 2, 3, 4, 5])
  .pipe(
    myLast()
  )
  .subscribe(console.log)

of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
  .pipe(
    endsWith('Silva')
  )
  .subscribe(console.log)