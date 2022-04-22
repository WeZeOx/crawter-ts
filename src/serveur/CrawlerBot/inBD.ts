import {PrismaClient} from '@prisma/client'

type objJson =
  { Id: number,
    Views: string,
    Follow: string,
    Category: string,
    Tag: string,
    SpecTop: string,
    NameTop: string,
    DateLaunch?: undefined }
  |
  { DateLaunch: string,
    Id?: undefined,
    Views?: undefined,
    Follow?: undefined,
    Category?: undefined,
    Tag?: undefined,
    SpecTop?: undefined,
    NameTop?: undefined
  }


export const prisma = new PrismaClient()

export const inBD = async (trend: any) => {
  await prisma.trend.deleteMany({})
  await prisma.trendLive.deleteMany({})
  
 
  trend.map(async (item: objJson, index: number) => {
    if (index === trend.length - 1) return
    
    await prisma.trend.create({
      data: {
        Id: item.Id ?? 404,
        Views: item.Views ?? "No Views provided",
        Follow: item.Follow ?? "No Follow provided",
        Category: item.Category ?? "No Category provided",
        Tag: item.Tag ?? "No Tag provided",
      }
    })
    await prisma.trendLive.create({
      data: {
        Id: item.Id ?? 404,
        SpecTop: item.SpecTop ?? "No Views provided",
        NameTop: item.NameTop ?? "No Follow provided",
        TrendId: item.Id ?? 404,
      }
    })
  })
  return 'finish here'
}