const method = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'admin': 'true'
  }
}

const fetchData = () => {
  return fetch('http://localhost:3000/api', method)
    .then((r) => r.json())
    .catch((err) => console.log(err))
}

const data = Object.values(await fetchData())
const containerCard = document.getElementById('containerCard')

document.getElementById('inputSearch').addEventListener("input", (e) => {
  const value = e.target.value.toUpperCase()
  cardData.forEach((trend) => {
    const isVisible = trend.category.includes(value)
    trend.element.classList.toggle("hide", !isVisible)
  })
});

const cardData = data.map((item, index) => {
  const img = item.TrendTop
  const category = item.Category

  const content = `
    <div class="bottom">
       <span class="category">#${index + 1} ${category}</span>
       <button class="btn"><a href="trend/${index +1}">See more details</a></button>
    </div>`

  let htmlObject = document.createElement('div');
  htmlObject.className = "card"
  htmlObject.style.backgroundImage = `url(${img})`

  htmlObject.innerHTML = content;
  containerCard.appendChild(htmlObject)
  return {category: category.toUpperCase(), element: htmlObject, id: index}
})
