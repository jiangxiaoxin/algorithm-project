Promise.resolve(10)
  .then(a => {
    console.log('外链1', a)
    return 100
  })
  .then(a => {
    console.log('外链2', a)
  })
setTimeout(() => {
  console.log('外链 timeout')
}, 0)
console.log('外链')
