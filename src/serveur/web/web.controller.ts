import { Request, Response } from "express";

export const trendPage = (req: Request, res: Response) => {
  res.sendFile('Trend.html', { root: './src/client/Trend' })
}

export const trendPageId = (req: Request, res: Response) => {
  res.sendFile('TrendId.html', { root: './src/client/TrendId' })
}