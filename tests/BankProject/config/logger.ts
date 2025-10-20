import log4js from 'log4js';

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p]: %m',
      },
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
  },
});

const logger = log4js.getLogger('default');

export { logger };
