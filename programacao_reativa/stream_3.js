const rxjs = require('rxjs')

const { interval } = rxjs

const gerarNumeros = interval(500)

const subscription = gerarNumeros.subscribe(num => {
  console.log(Math.pow(2, num))
})

setTimeout(() => {
  subscription.unsubscribe()
}, 2000)

