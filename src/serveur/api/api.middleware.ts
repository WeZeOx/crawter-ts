import { Request, Response, NextFunction} from "express";

export class Error {
  code
  message
  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}

export const checkIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  if (!id || !Number.isInteger(+id)) {
    next(new Error(400, "invalid id"))
    return
  }
  next()
}

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response) => {
  res.status(error.code ?? 500).send(error.message ?? "internal server error")
}
