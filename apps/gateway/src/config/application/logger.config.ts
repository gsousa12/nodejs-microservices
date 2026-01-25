import { Params } from 'nestjs-pino';

export const loggerConfig: Params = {
  pinoHttp: {
    autoLogging: false,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
};
