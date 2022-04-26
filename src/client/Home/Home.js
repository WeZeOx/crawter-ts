const fetchData = () => {
  return fetch('http://localhost:3000/api')
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

  const content = `<div class="card">
    <span class="top">TOP #${index + 1}</span>
    <div class="containerImg"><img src="${img}" alt="Image Trend"/></div>
    <span class="category">${category}</span>
</div>`

  const htmlObject = document.createElement('div');
  htmlObject.innerHTML = content;
  containerCard.appendChild(htmlObject)
  return {category: category.toUpperCase(), element: htmlObject, id: index}


})