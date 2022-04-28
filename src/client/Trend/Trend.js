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

let x = []
let y = []

const cardData = data.map((item, index) => {
  const img = item.TrendTop
  const category = item.Category

  x.push(category)
  y.push(parseFloat(item.Views.slice(0, -1).replaceAll(',', '.')))

  const content = `
    <div class="bottom">
       <span class="category">#${index + 1} ${category}</span>
       <button class="btn"><a href="home/${index +1}">See more details</a></button>
    </div>`

  let htmlObject = document.createElement('div');
  htmlObject.className = "card"
  htmlObject.style.backgroundImage = `url(${img})`

  htmlObject.innerHTML = content;
  containerCard.appendChild(htmlObject)
  return {category: category.toUpperCase(), element: htmlObject, id: index}
})

const data2 = {
  labels: x,
  datasets: [{
    label: 'Number of views',
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgb(255, 99, 132)',
    data: y,
  }],
};

const config = {
  type: 'line',
  data: data2,
  options: {
      scales: {
        x: {
          ticks: {
            color: 'rgb(255, 99, 132)'
          }
        },
        y: {
          ticks: {
            color: 'rgb(255, 99, 132)'
          }
        },
      },
    plugins: {
      legend: {
        onClick: null
      }
    }
  }
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
