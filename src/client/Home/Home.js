
const fetchData = () => {
  return fetch('http://localhost:3000/api')
    .then((r) => r.json())
    .catch((err) => console.log(err))
}
const data = Object.values(await fetchData())

data.forEach((item) => {
  console.log(item)

  const img = item.TrendTop



  // img.forEach((image) => {
    let newDiv = document.createElement('div')
    newDiv.style.background = `url(${img})`
    newDiv.className = "test"
    document.body.appendChild(newDiv)
  // })
})
