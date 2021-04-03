const { Observable, noop } = require('rxjs')

const observable = Observable.create(subscriber => {
  subscriber.next('Observer é bem legal..')
  subscriber.next('Observer é bem legal..')
  subscriber.next('Observer é bem legal..')

  if (Math.random() > 0.5) {
    subscriber.complete()
  } else {
    subscriber.error('Erro!!')
  }
})

observable.subscribe(
  console.log,
  // (err) => console.error(err),
  noop, // 'ignora' o erro
  () => console.log('ACABOU!!')
)

observable.subscribe({
  next: console.log,
  error: (err) => console.error(err),
  complete: () => console.log('ACABOU!!')
})