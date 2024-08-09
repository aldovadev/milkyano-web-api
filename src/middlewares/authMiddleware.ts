import { Request, Response, NextFunction } from 'express';

const SQUARE_API_KEY = process.env.SQUARE_API_KEY as string;

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== SQUARE_API_KEY) {
    res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  } else {
    next();
  }
};