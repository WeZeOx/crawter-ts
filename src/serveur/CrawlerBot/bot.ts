import puppeteer from 'puppeteer'
import {inJson} from "./writeJSON";
import {inBD} from './inBD'

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
    defaultViewport: {width: 600, height: 800}
  });
  
  const page = await browser.newPage();
  await page.goto('https://www.twitch.tv/directory?sort=VIEWER_COUNT', {waitUntil: 'networkidle2'});
  await page.click('button[data-a-target="consent-banner-accept"]')
  
  const url = await page.$$eval('a.ScCoreLink-sc-udwpw5-0.jswAtS.tw-link', (el: Element[]) => {
    return el.map((item: Element) => {
      return 'https://www.twitch.tv' + item.getAttribute('href') + '?sort=VIEWER_COUNT'
    })
  })
  
  const newUrl = url.filter((item, pos) => url.indexOf(item) === pos)
  
  const promises = newUrl.map(async (item) => {
    const newPage = await browser.newPage();
    newPage.setDefaultTimeout(0)
    newPage.setDefaultTimeout(0)
    await newPage.goto(item, {waitUntil: 'networkidle2'});
    
    const spec = await newPage.$$eval('div.Layout-sc-nxg1ff-0.pqFci.InjectLayout-sc-588ddc-0', (el: Element[]) => {
      return [el[0].textContent, el[1].textContent]
    })
    
    const name = await newPage.$$eval('h1.CoreText-sc-cpl358-0.ScTitleText-sc-1gsen4-0.kGpodG.gasGNr.tw-title', (el: Element[]) => {
      return el[0].textContent
    })
    
    const tag = await newPage.$$eval('div.InjectLayout-sc-588ddc-0.jNvUhD div.ScTagContent-sc-xzp4i-1.gONNWj', (el: Element[]) => {
      return el.map((item) => {
        return item.textContent
      })
    })
    
    const nameTop = await newPage.$$eval('h3.CoreText-sc-cpl358-0.ilJsSZ', (el: Element[]) => {
      return el.map((item) => {
        return item.textContent
      })
    })
    
    const specTop = await newPage.$$eval('div.ScMediaCardStatWrapper-sc-1ncw7wk-0.jluyAA.tw-media-card-stat', (el: Element[]) => {
      return el.map((item) => {
        return item.textContent
      })
    })
    
    const newSpecTop = specTop.slice(1, 5).join(',')
    const newNameTop = nameTop.slice(1, 5).join(',')
    await newPage.close()
    return [spec, name, tag.join(','), newSpecTop, newNameTop]
  })
  const result = await Promise.all(promises)
  
  const json = inJson(result)
  await inBD(json).then((r: string) => console.log(r))
  await browser.close()
})();