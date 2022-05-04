const method = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'admin': 'true'
  }
}
const fetchData = () => {
  return fetch('http://localhost:3000/api/date', method)
    .then((r) => r.json())
    .catch((err) => console.log(err))
}
const data = Object.values(await fetchData()).join(' ').split(' ')
let newArrTime = []
let newArr = []

let day = data[0].split('/')[0]
let month = data[0].split('/')[1]
let year = data[0].split('/')[2]

let hour = data[1].split(':')[0]
let minute = data[1].split(':')[1]
let second = data[1].split(':')[2]

if (day.length === 1) newArrTime.push('0' + day)
else newArrTime.push(day)
if (month.length === 1) newArrTime.push('0' + month)
else newArrTime.push(month)
newArrTime.push(year)

if (hour.length === 1) newArr.push(hour = + '0' + hour)
else newArr.push(hour)
if (minute.length === 1) newArr.push(minute = + '0' + minute)
else newArr.push(minute)
if (second.length === 1) newArr.push(second = + '0' + second)
else newArr.push(second)

const footer = document.getElementById('footer')

footer.append(`Time since last update : ${newArrTime.join('/')} ${newArr.join(':')}`)
