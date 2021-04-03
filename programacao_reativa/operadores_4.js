const { Observable, from } = require('rxjs')

const myFirst = () => {
  return (sourceObservable) => {
    return new Observable((subscriber) => {
      sourceObservable.subscribe({
        next: (value) => {
          subscriber.next(value)
          subscriber.complete()
        },
      })
    })
  }
}

const myLast = () => {
  return (sourceObservable) => {
    return new Observable((subscriber) => {
      let lastValue = null

      sourceObservable.subscribe({
        next: (value) => {
          lastValue = value 
        },
        complete: () => {
          subscriber.next(lastValue)
          subscriber.complete()
        }
      })
    })
  }
}

from([1, 2, 3, 4, 5])
  .pipe(
    // myFirst()
    myLast()
  )
  .subscribe(console.log)