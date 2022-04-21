import express from "express";
import {homePage} from "./web.controller";

const router = express.Router()
router.get('/file/:id', (req, res) => {
  res.sendFile(req.params.id, { root: './src/client/Home' })
})

router.get('/home', homePage)

export default router