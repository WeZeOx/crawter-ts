const fetchData = () => {
  return fetch('http://localhost:3000/api')
    .then((r) => r.json())
    .catch((err) => console.log(err))
}

const data = Object.values(await fetchData())
console.log(data)

let x = []
let y = []

data.map((item) => {
  const category = item.Category

  x.push(category)
  if (item.Views.slice(-1) === 'M') y.push(parseFloat(item.Views.slice(0, -1).replaceAll(',', '.')) * 1000)
  else y.push(parseFloat(item.Views.slice(0, -1).replaceAll(',', '.')))
})

const data2 = {
  labels: x,
  datasets: [{
    label: 'Number of viewers',
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