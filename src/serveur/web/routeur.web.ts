import express, { Response, Request } from "express";
import { trendPageId, trendPage, statsPage, homePage, creditPage } from "./web.controller";

const router = express.Router()

// For send CSS and JS to the client
router.get('/trend/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/Trend' }))
router.get('/trendId/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/TrendId' }))
router.get('/stats/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/Stats' }))
router.get('/notfound/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/NotFound' }))
router.get('/home/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/Home' }))
router.get('/credit/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/Credit' }))
router.get('/public/:id', (req: Request, res: Response) => res.sendFile(req.params.id, { root: './src/client/public' }))

// Route for navigation thought the website
router.get('/twitch/trend', trendPage)
router.get('/twitch/trend/:id', trendPageId)
router.get('/twitch/stats', statsPage)
router.get('/home', homePage)
router.get('/credit', creditPage)

export default router