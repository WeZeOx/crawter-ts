import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient()
import trend from "../../../data/tendanceTwitch.json";

export const inBD = async () => {
  await prisma.trend.deleteMany({})
  
  type objJson = { Id: number, Views: string, Follow: string, Category: string, Tag: string, DateLaunch?: undefined } |
    { DateLaunch: string, Id?: undefined, Views?: undefined, Follow?: undefined, Category?: undefined, Tag?: undefined }
  
  // trend.twitchTrendArray.map(async (item: any, index: number) => {
  //   console.log(index)
  //   if (index === trend.twitchTrendArray.length - 1) return
  //
  //   await prisma.trend.update({
  //     where: {
  //       Id: item.Id
  //     },
  //     data: {
  //       Id: item.Id ?? 404,
  //       Views: item.Views ?? "No Views provided",
  //       Follow: item.Follow ?? "No Follow provided",
  //       Category: item.Category ?? "No Category provided",
  //       Tag: item.Tag ?? "No Tag provided",
  //     }
  //   })
    // await prisma.trendLive.update({
    //   where: {Id: item.Id},
    //   data: {
    //     Id: item.Id ?? 404,
    //     SpecTop: item.SpecTop ?? "No Views provided",
    //     NameTop: item.NameTop ?? "No Follow provided",
    //     TrendId: item.Id ?? 404,
    //   }
    // })
  //})
}