import { Request, Response, NextFunction } from "express";
import { handleErrorResponse } from "./swichhandlerError";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    console.error('Error caught in middleware:', err);
    const httpResponse = handleErrorResponse(err);
    return res.status(httpResponse.statusCode).json(httpResponse.body);
  }