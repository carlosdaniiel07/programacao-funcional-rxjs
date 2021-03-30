const notas = [
  {
      data: '2017-10-31',
      itens: [
          { conta: '2143', valor: 200 },
          { conta: '2111', valor: 500 }
      ]
  },
  {
      data: '2017-07-12',
      itens: [
          { conta: '2222', valor: 120 },
          { conta: '2143', valor: 280 }
      ]
  }, 
  {
      data: '2017-02-02',
      itens: [
          { conta: '2143', valor: 110 },
          { conta: '7777', valor: 390 }
      ]
  },     
]

const itens = notas.flatMap(nota => nota.itens)
const totalValue = [...itens].reduce((total, {valor}) => total + valor, 0)

console.log(totalValue)