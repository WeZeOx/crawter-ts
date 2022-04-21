import {prisma} from "../CrawlerBot/inBD";

export const sendJSON = async () => {
  return await prisma.trend.findMany({
    include: {TrendLive: true}
  })
}

export const sendJSONById = async (id: string) => {
  return await prisma.trend.findMany({
    where: {Id: Number(id)},
    include: {TrendLive: true}
  })
}