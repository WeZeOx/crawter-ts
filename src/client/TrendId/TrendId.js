const method = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'admin': 'true'
  }
}
const Id = window.location.pathname.split('/')[3]
const containerTrend = document.getElementById('containerTrend')
const containerLive = document.getElementById('containerLive')

const fetchData = () => {
  return fetch(`http://localhost:3000/api/${Id}`, method)
    .then((r) => r.json())
    .catch((err) => console.log(err))
}
const data = Object.values(await fetchData())
const nameLive = data[0].TrendLive[0].NameTop.split('\n')

const topPage = () => {
  const content = `
    <div id="containerImg"> 
        <img id="trendImg" src="${data[0].TrendTopImg})" alt="Trend Image" />
    </div>
    <span id="trendName">Name : ${data[0].Category}</span>
 
    <div id="side">
        <span id="trendView">Number of views : ${data[0].Views}</span>
        <span id="trendFollow">Number of follows : ${data[0].Follow}</span>
        <span id="trendTag"> Tag : &nbsp;${data[0].Tag.replaceAll(',', ', ')}</span>
    </div>
    <span id="trendLive">Top 4 on this Trend :</span>
`

  let htmlObject = document.createElement('div');
  htmlObject.className = "containerUp"
  htmlObject.innerHTML = content;
  containerTrend.appendChild(htmlObject)
}
topPage()

const top4Live = () => {
  nameLive.forEach((item, index) => {
    const spec = data[0].TrendLive[0].SpecTop.split('.')[index]
    const label = data[0].TrendLive[0].ImgTop.split(',')[index]
    const link = data[0].TrendLive[0].UrlTopLive.split(',')[index]
    const streamer = data[0].TrendLive[0].NameTopLive.split(',')[index]

    const content = `
    <div class="top">
        <span class="trendLiveStreamer">Name of the streamer : ${streamer}</span>
    </div>
    <div class="bottom">
         <span class="trendLiveName">Title : ${item}</span>
        <span class="trendLiveSpec">Number of viewvers : ${spec}</span>
        <a class="trendurl" href="${link}" target="_blank">Link to his stream</a>     
    </div>`

    let htmlObject = document.createElement('div');
    htmlObject.className = "live"
    htmlObject.innerHTML = content;
    htmlObject.style.backgroundImage = `url(${label})`
    htmlObject.style.backgroundSize = 'cover'
    htmlObject.style.backgroundRepeat = 'no-repeat'
    htmlObject.style.backgroundPosition = 'center center'
    htmlObject.style.width = 100 + '%';

    containerLive.appendChild(htmlObject)
  })
}
top4Live()



