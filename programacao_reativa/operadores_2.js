// const { interval } = require('rxjs')
// const { map, concatAll } = require('rxjs/operators')

// interval(1000)
//   .pipe(
//     map(_ => [1, 2, 3]),
//     concatAll()
//   )
//   .subscribe(console.log)

const { XMLHttpRequest } = require('xmlhttprequest')
const { ajax } = require('rxjs/ajax')
const { last, map, concatAll } = require('rxjs/operators')

const url = 'https://api.github.com/users/carlosdaniiel07/repos'

ajax({
  createXHR: () => new XMLHttpRequest(),
  url
})
  .pipe(
    map(response => JSON.parse(response.xhr.responseText)),
    concatAll(),
    map(respository => respository.full_name),
    last()
  )
  .subscribe(console.log)