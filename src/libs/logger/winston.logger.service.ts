import { Inject, Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import { CustomLoggerI, LogDataI } from './interface/logs.interface';
import { LogLevelEnum } from './enums/loglevel.enum';

export const WinstonLoggerTransportsKey = Symbol();

@Injectable()
export class WinstonLogger implements CustomLoggerI {
  private logger: winston.Logger;

  constructor(
    @Inject(WinstonLoggerTransportsKey) transports: winston.transport[],
  ) {
    this.logger = winston.createLogger(this.getLoggerFormatOptions(transports));
    // this.logger = winston.createLogger({
    //   level: LogLevelEnum.Debug,
    //   format: winston.format.combine(
    //     winston.format.timestamp({
    //       format: 'DD/MM/YYYY, HH:mm:ss',
    //     }),
    //     winston.format.errors({ stack: true }),
    //     winston.format.metadata({
    //       key: 'data',
    //       fillExcept: ['timestamp', 'level', 'message'],
    //     }),
    //     winston.format.json(),
    //   ),
    //   transports: [
    //     new winston.transports.Console({
    //       format: winston.format.printf((info) => {
    //         const moduleName = this.getCallingModuleName();
    //         const prefix = moduleName ? `[${moduleName}]` : '';
    //         return `${info.timestamp} ${info.level.toUpperCase()}: ${info.message.toUpperCase()}`;
    //       }),
    //     }),
    //   ],
    // });
  }
  private getLoggerFormatOptions(transports: winston.transport[]) {
    // Setting log levels for winston
    const levels: any = {};
    let cont = 0;
    Object.values(LogLevelEnum).forEach((level) => {
      levels[level] = cont;
      cont++;
    });

    return {
      level: LogLevelEnum.Debug,
      levels: levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD/MM/YYYY, HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format((info, opts) => {
          if (info.error && info.error instanceof Error) {
            info.stack = info.error.stack;
            info.error = undefined; // did this to ensure clarity and reduce error stack trace
          }
          info.label = `${info.organization}.${info.context.toUpperCase()}.${info.app.toUpperCase()}`;;
          return info;
        })(),
        winston.format.metadata({
          key: 'data',
          fillExcept: ['timestamp', 'level', 'message'],
        }),
        winston.format.json(),
      ),
      transports: transports,
      exceptionHandlers: transports,
      rejectionHandlers: transports,
    };
  }

  private getCallingModuleName(): string {
    const stackTrace = new Error().stack || '';
    const matches = stackTrace.match(/\(([^)]+)\)/g);
    if (matches) {
      for (let i = 1; i < matches.length; i++) {
        const filePath = matches[i].slice(1, -1);
        if (
          !filePath.includes('node_modules') &&
          !filePath.includes(__filename)
        ) {
          const moduleName = filePath.split('/').pop()?.split('.').shift();
          return moduleName || '';
        }
      }
    }
    return '';
  }

  public log(
    level: LogLevelEnum,
    message: string | Error,
    data?: LogDataI,
    profile?: string,
  ) {
    const logData = {
      level: level,
      message: message instanceof Error ? message.message : message,
      error: message instanceof Error ? message : undefined,
      ...data,
    };

    if (profile) {
      this.logger.profile(profile, logData);
    } else {
      this.logger.log(logData);
    }
  }
  public debug(message: string, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Debug, message, data, profile);
  }

  public info(message: string, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Info, message, data, profile);
  }

  public warn(message: string | Error, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Warn, message, data, profile);
  }

  public error(message: string | Error, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Error, message, data, profile);
  }

  public fatal(message: string | Error, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Fatal, message, data, profile);
  }

  public emergency(message: string | Error, data?: LogDataI, profile?: string) {
    this.log(LogLevelEnum.Emergency, message, data, profile);
  }

  public startProfile(id: string) {
    this.logger.profile(id);
  }
}


