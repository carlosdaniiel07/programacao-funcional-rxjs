const readline = require('readline')
const { Observable, async, of, from } = require('rxjs')

const numbers = []

const getResponse = (question = '') => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((res) => {
    rl.question(question, (answer) => {
      res(answer)
      rl.close()
    })
  })
}

const app = async () => {
  while (numbers.length < 10) {
    const number = await getResponse('Digite um valor: ')
  
    numbers.push(number)
  }

  from(numbers).subscribe((value) => console.log(value))
}


app()