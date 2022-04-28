import express from 'express';
import schedule from 'node-schedule'

import {errorHandlerMiddleware} from "./api/api.middleware";
import apiRouter from "./api/routeur.api";
import webRouer from './web/routeur.web'

// schedule.scheduleJob('*/1 * * * *', () => {
//   console.log('The answer to life, the universe, and everything!');
// });

const app = express();

app.use(express.json());

app.use("/api", apiRouter)
app.use("/", webRouer)

app.use(errorHandlerMiddleware)

app.listen(3000, () => console.log('Server Running'));