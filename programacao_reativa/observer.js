const readline = require('readline')

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

const namorada = () => {
  console.log('N: Apagar as luzes')
  console.log('N: Pedir silêncio')
  console.log('N: Surpresaaa!!!')
}

const sindico = () => {
  console.log('S: Monitorando o barulho...')
}

// subject
const porteiro =  async (...observers) => {
  while (true) {
    const answer = await getResponse('O namorado chegou? (s/N/q) ')

    if (answer === 's') {
      observers.forEach((observer) => observer(new Date()))
    } else if (answer === 'q') {
      break
    }
  }
}

// registrando os observers no subject
porteiro(namorada, sindico)