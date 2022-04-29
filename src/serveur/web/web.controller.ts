import { Request, Response } from "express";

export const trendPage = (req: Request, res: Response) => {
  res.sendFile('Trend.html', { root: './src/client/Trend' })
}

export const trendPageId = (req: Request, res: Response) => {
  res.sendFile('TrendId.html', { root: './src/client/TrendId' })
}

export const statsPage = (req: Request, res: Response) => {
  res.sendFile('Stats.html', { root: './src/client/Stats' })
}

export const homePage = (req: Request, res: Response) => {
  res.sendFile('Home.html', { root: './src/client/Home' })
}