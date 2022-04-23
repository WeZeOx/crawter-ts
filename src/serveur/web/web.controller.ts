import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
  res.sendFile('Home.html', { root: './src/client/Home' })
}

export const homeId = (req: Request, res: Response) => {
  res.send(req.params.id)
}