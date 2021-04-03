const { Observable, of } = require('rxjs')

const endsWith = (value = '') => {
  return sourceObservable => {
    return new Observable(subscriber => {
      sourceObservable.subscribe({
        next: (currentValue) => {
          const isArray = Array.isArray(currentValue)

          if (isArray) {
            const elements = currentValue.filter(element => element.endsWith(value))
            elements.length && subscriber.next(elements)
          } else {
            currentValue.endsWith(value) && subscriber.next(currentValue)
          }
        },
        error: (err) => subscriber.error(err),
        complete: () => subscriber.complete()
      })
    })
  }
}

of(['Ana Silva', 'Maria Silva', 'Pedro Rocha'])
  .pipe(
    endsWith('Silva')
  )
  .subscribe(console.log)

  of('Ana Silva', 'Maria Silva', 'Pedro Rocha')
  .pipe(
    endsWith('Silva')
  )
  .subscribe(console.log)