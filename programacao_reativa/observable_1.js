const { Observable } = require('rxjs')

const promise = new Promise((res) => {
  res('Promise resolvida!')
  res('Promise resolvida!')
})

promise
  .then(console.log)

const observable = new Observable(subscriber => {
  subscriber.next('Observer é bem legal..')
  subscriber.next('Observer é bem legal..')
  subscriber.next('Observer é bem legal..')
})

observable.subscribe(console.log)
