const { timer, Subscription } = require('rxjs')

const subscription = timer(3000, 500)
  .subscribe(console.log)
const subscription2 = timer(3000, 500)
  .subscribe(console.log)

const sub = new Subscription()

sub
  .add(subscription)
  .add(subscription2)

// subscription.add(subscription2)

setTimeout(() => {
  sub.unsubscribe()

  // subscription.unsubscribe()
  // subscription2.unsubscribe()
}, 8000)


