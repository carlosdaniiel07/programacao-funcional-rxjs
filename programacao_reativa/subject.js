const { Subject, Observable } = require('rxjs')

const getObservable = () => {
  return new Observable((subscriber) => {
    setTimeout(() => {
      const value = Math.random()
      
      subscriber.next(value)
      subscriber.complete()
    }, 1000)
  })
}

const observable = getObservable()

observable.subscribe(console.log)
observable.subscribe(console.log)

const getSubject = () => {
  const subject = new Subject()

  setTimeout(() => {
    const value = Math.random()
    
    subject.next(value)
    subject.complete()
  }, 1000)

  return subject
}

const subject = getSubject()

subject.subscribe(console.log)
subject.subscribe(console.log)

