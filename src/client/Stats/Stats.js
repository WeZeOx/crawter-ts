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
const containerStats = document.getElementById('containerStats')

let xAxis = []
let yAxis = []
let countView = 0
let countFollow = 0

const showStats = () => {
  countView = Math.round(countView)
  countFollow = Math.round(countFollow)

  let content = `
    <span class="countView">${countView}K views in the top 30</span>
    <span class="countView">${countFollow}M follow in the top 30</span>
   `

  let htmlObject = document.createElement('div');
  htmlObject.className = "stats"
  htmlObject.innerHTML = content;

  containerStats.append(htmlObject)
}

const sortData = () => {
  data.map((item) => {
    const viewCategory = parseFloat(item.Views.slice(0, -1).replaceAll(',', '.'))
    const category = item.Category
    const followCategory = item.Follow.replaceAll(',', '.')

    if (followCategory.slice(-1) === 'k') countFollow += parseFloat(followCategory.slice(0, -1)) / 1000
    else countFollow += parseFloat(followCategory.slice(0, -1))
    xAxis.push(category)

    if (item.Views.slice(-1) === 'M') {
      countView += viewCategory * 1000
      yAxis.push(viewCategory * 1000)
    } else {
      countView += viewCategory
      yAxis.push(viewCategory)
    }
  })
}

sortData()
showStats()

const legend = {
  labels: xAxis,
  datasets: [{
    label: 'Number of viewers',
    color: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgb(255, 99, 132)',
    data: yAxis,
  }],
};

const config = {
  type: 'line',
  data: legend,
  options: {
    scales: {
      x: {
        display: true,
        ticks: {
          color: 'rgb(255, 99, 132)'
        }
      },
      y: {
        display: true,
        type: 'logarithmic',
        min: 0,
        ticks: {
          color: 'rgb(255, 99, 132)'
        }
      },
    },
    plugins: {
      title: {
        color: 'rgb(255, 99, 132)',
        display: true,
        text: 'Twitch Trend',
      },
      legend: {
        display: true,
        labels: {
          position: 'right',
          color: 'rgb(255, 99, 132)'
        },
        onClick: null
      }
    }
  }
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);