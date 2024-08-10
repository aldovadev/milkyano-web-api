import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'

dotenv.config()

const X_API_KEY = process.env.X_API_KEY as string;

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== X_API_KEY) {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  } else {
    next();
  }
};