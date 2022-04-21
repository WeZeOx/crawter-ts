import express from 'express';
import trend from '../../data/tendanceTwitch.json'
import {errorHandlerMiddleware} from "./api/api.middleware";
import apiRouter from "./api/routeur";
import webRouer from './web/routeur'

const app = express();

app.use(express.json());
app.use("/api", apiRouter)
app.use("/", webRouer)

app.use(errorHandlerMiddleware)
app.listen(3000, () => console.log('Server Running'));