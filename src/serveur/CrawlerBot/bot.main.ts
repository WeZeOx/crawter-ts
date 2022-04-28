import puppeteer from 'puppeteer'
import { botWriteJson } from "./bot.writejson";
import { botWriteBdd } from './bot.writebdd'

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
    defaultViewport: { width: 600, height: 800 }
  });
  
  const page = await browser.newPage();
  //await page.goto('https://www.twitch.tv/directory?sort=VIEWER_COUNT', { waitUntil: 'networkidle2' });
  
  await page.goto('https://www.twitch.tv/', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000)
  await page.click('button[data-a-target="consent-banner-accept"]')
  await page.click('header a.ScCoreLink-sc-udwpw5-0.ktfxqP.tw-link')
  
  await page.waitForSelector('button[data-a-target="browse-sort-menu"]')
  await page.click('button[data-a-target="browse-sort-menu"]')
  await page.click('a[data-test-selector="browse-sort-VIEWER_COUNT"]')
  
  await page.waitForTimeout(500)
  
  const url = await page.$$eval('a.ScCoreLink-sc-udwpw5-0.jswAtS.tw-link', (el: Element[]) => {
    return el.map((item: Element) => {
      return 'https://www.twitch.tv' + item.getAttribute('href') + '?sort=VIEWER_COUNT'
    })
  })
  
  const imgTrendTop = await page.$$eval('.ScAspectRatio-sc-1sw3lwy-1.kPofwJ.tw-aspect img', (el: Element[]) => {
    return el.map((item) => {
      return item.getAttribute('src')
    })
  })
  
  const newUrl = url.filter((item, pos) => url.indexOf(item) === pos).slice(0, 5)
  
  const promises = newUrl.map(async (item) => {
    const newPage = await browser.newPage();
    newPage.setDefaultTimeout(0)
    newPage.setDefaultTimeout(0)
    await newPage.goto(item, { waitUntil: 'networkidle2' });
    
    const fetchMultipleData = async (path: string) => {
      return await newPage.$$eval(path, (el: Element[]) => {
        return el.map((item) => {
          return item.textContent
        })
      })
    }
    
    const spec = await newPage.$$eval('div.Layout-sc-nxg1ff-0.pqFci.InjectLayout-sc-588ddc-0', (el: Element[]) => {
      return [el[0].textContent, el[1].textContent]
    })
    
    const name = await newPage.$$eval('h1.CoreText-sc-cpl358-0.ScTitleText-sc-1gsen4-0.kGpodG.gasGNr.tw-title', (el: Element[]) => {
      return el[0].textContent
    })
    
    const img = await newPage.$$eval('.tw-image:not(.InjectLayout-sc-588ddc-0.iDjrEF.tw-image.tw-image-avatar)', (el: Element[]) => {
      return el.map((item) => {
        return [item.getAttribute('src')]
      })
    })
    
    const tag = await fetchMultipleData('div.InjectLayout-sc-588ddc-0.jNvUhD div.ScTagContent-sc-xzp4i-1.gONNWj')
    const nameTop = await fetchMultipleData('h3.CoreText-sc-cpl358-0.ilJsSZ')
    const specTop = await fetchMultipleData('div.ScMediaCardStatWrapper-sc-1ncw7wk-0.jluyAA.tw-media-card-stat')
    
    
    const test1 = await fetchMultipleData('a.ScCoreLink-sc-udwpw5-0.jswAtS.ScCoreLink-sc-ybxm10-0.dnhAtW.tw-link')
    
    const test2 = await newPage.$eval('a.ScCoreLink-sc-udwpw5-0.jswAtS.ScCoreLink-sc-ybxm10-0.dnhAtW.tw-link', (el: Element) => {
      return el
    })
    
    console.log(test1.slice(5, 10))
    console.log(test2)
    
    const regexView = /(\s|\b| )spectateurs/g
    
    const newSpecTop = specTop.slice(1, 5).join('.').replaceAll(regexView, '').replaceAll(' ', '')
    const newNameTop = nameTop.slice(1, 5).join('\n')
    const newTag = tag.join(',')
    await newPage.close()
    
    return [spec, name, newTag, newSpecTop, newNameTop, img.slice(2, 6).join(','), imgTrendTop]
  })
  const result = await Promise.all(promises)
  
  const json = botWriteJson(result)
  await botWriteBdd(json).then((r: string) => console.log(r))
  
  await browser.close()
})();