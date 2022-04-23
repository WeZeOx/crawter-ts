import express from "express";

const router = express.Router()
import { fetchData, fetchId } from "./api.controller";
import { checkIdMiddleware } from "./api.middleware";

router.get('/', fetchData)
router.get('/:id', checkIdMiddleware, fetchId)

export default router