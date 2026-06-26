const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json(),
 winston.format.errors({ stack:true }),

);
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
      )
    ),
  }), 
];
if(process.env.NODE_ENV !== 'production'){
  transports.push( new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, 
    maxSize: '20m',     
    maxFiles: '14d',     
    level: 'error',
  }),
)
transports.push( new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d', 
  }) )
}
const logger = winston.createLogger({
  level: level,
  format,
  transports
});

module.exports = logger;