import { createLogger } from 'winston';
import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;
const { NODE_ENV: env } = process.env;
const isLocal = env === 'local';
const customFormat = printf(
  ({ timestamp: t, level, message }) => `${t} - [${level.toUpperCase()}] : ${message}`,
);

export const logger = createLogger({
  level: isLocal ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({ level: isLocal ? 'debug' : 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  format: combine(timestamp(), customFormat),
});
