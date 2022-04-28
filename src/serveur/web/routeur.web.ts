import express from "express";
import { trendPageId, trendPage } from "./web.controller";

const router = express.Router()

router.get('/trend/:id', (req, res) => {
  res.sendFile(req.params.id, { root: './src/client/Trend' })
})

router.get('/trendId/:id', (req, res) => {
  res.sendFile(req.params.id, { root: './src/client/TrendId' })
})

router.get('/home', trendPage)
router.get('/home/:id', trendPageId)

router.get('*', (req, res) => {
  res.send('tg')
})

export default router