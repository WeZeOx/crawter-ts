import express from 'express';
import schedule from 'node-schedule'
import favicon from 'serve-favicon'

import { errorHandlerMiddleware } from "./api/api.middleware";
import { launchTwitchBot } from './CrawlerBot/bot.main'

import apiRouter from "./api/routeur.api";
import webRouter from './web/routeur.web'
import path from "path";

schedule.scheduleJob('0 * * * *', () => launchTwitchBot())

const app = express();

app.use(favicon(path.join(__dirname, 'favicon', 'favicon.svg')))
app.use(express.json())
app.use("/api", apiRouter)
app.use("/", webRouter)

app.get('*', (req, res) => res.sendFile('NotFound.html', { root: './src/client/NotFound' }))

app.use(errorHandlerMiddleware)

app.listen(3000, () => console.log('Server Running'));