import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import formRoutes from './routes/formRoute';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.get('/', async (_, res: Response) => {
  res.json({ message: 'API Fadedlinesbarbershop is working!' });
});

app.use('/api/v1', formRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
