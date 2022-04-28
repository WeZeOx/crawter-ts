import fs from "fs";


export const botWriteJson = (arg: (string | (string | null)[] | null)[][]) => {
  let twitchTrendArray: {}[] = []
  let idx = 0
  const regexFollow = /(\s|\b| )followers/g
  const regexView = /(\s|\b| )spectateurs/g
  while (idx !== arg.length) {
    twitchTrendArray.push({
        "Id": idx + 1,
        "Views": arg[idx][0]?.[0]?.replace(regexView, '').replace(' ', ''),
        "Follow": arg[idx][0]?.[1]?.replace(regexFollow, '').replace(' ', ''),
        "Category": arg[idx][1],
        "Tag": arg[idx][2],
        "SpecTop": arg?.[idx][3],
        "NameTop": arg[idx][4],
        "ImgTop": arg[idx][5],
        "TrendTop": arg[idx]?.[6]?.[idx]
      })
    idx++
  }
  
  const date = new Date()
  let hour: string = date.getHours().toString()
  if (hour.length === 1) hour = '0' + hour
  twitchTrendArray.push({"DateLaunch": `${date.getDate()}\/${date.getMonth() + 1}\/${date.getFullYear()} ${hour}:${date.getMinutes()}:${date.getSeconds()}`})
  fs.writeFile('src/data/tendanceTwitch.json', JSON.stringify({twitchTrendArray}, null, 2), (err) => {
    if (err) throw err;
    else console.log('File is write successfully.');
  });
  return twitchTrendArray
}