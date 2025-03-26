const winston = require('winston');

const logLevel = process.env.LOG_LEVEL || 'debug';

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    sql: 4,
    debug: 5,
  },
  colors: {
    debug: 'rainbow',
    info: 'cyan',
    notice: 'white',
    http: 'bold magenta',
    sql: 'bold blue',
    warning: 'yellow',
    error: 'bold red',
    crit: 'inverse yellow',
    alert: 'bold inverse red',
    emerg: 'bold inverse magenta',
  },
};

winston.addColors(logLevels.colors);

/**
 * Creates a Winston logger instance with custom configuration.
 *
 * The logger is configured with the following features:
 * - Log levels and colors are defined by `logLevels.levels`.
 * - Log messages are formatted to include a timestamp, log level, and message.
 * - Errors are formatted to include their stack trace, with the error name highlighted in red.
 * - Additional metadata is serialized into a JSON string if present.
 * - Logs are output to the console with the specified `logLevel`.
 *
 * @constant
 * @type {winston.Logger}
 *
 * @example
 * logger.info('This is an info message');
 * logger.error(new Error('This is an error message'));
 */
const logger = winston.createLogger({
  level: logLevel,
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info: any) => {
      const {
        timestamp, level, message, ...args
      } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      if (info instanceof Error) {
        return `${ts} [${level}][\x1b[31m${info.name}\x1b[0m]\x1b[31m: ${info?.stack?.replace(`${info.name}: `, '').trim()}`;
      }
      return `${ts} [${level}]: ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: logLevel,
    }),
  ],
});

export default logger;
