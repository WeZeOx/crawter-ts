import {prisma} from "../CrawlerBot/bot.writebdd";
import trend from '../../data/tendanceTwitch.json'

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

export const sendDate = () => {
  return trend.twitchTrendArray[trend.twitchTrendArray.length - 1]
}
