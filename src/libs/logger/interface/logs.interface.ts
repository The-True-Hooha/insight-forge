import { LogLevelEnum } from '../enums/loglevel.enum';

export const LoggerBaseKey = Symbol();
export const LoggerKey = Symbol();

export interface Log {
  timestamp: number; // to accommodate for unix timestamp
  level: LogLevelEnum;
  message: string;
  data: LogDataI;
}

export interface LogDataI {
  organizations?: string; // organization or project name if you wish
  context?: string; // bounded context name
  app?: string; // your application name
  sourceClass?: string; // class name if the generated log (source)
  correlationId?: string; // correlation id
  error?: Error; // do you wish to send an error object
  props?: NodeJS.Dict<any>; // to add any additional params you wish to send
}

export interface CustomLoggerI {
  log(
    level: LogLevelEnum,
    message: string | Error,
    data?: LogDataI,
    profile?: string,
  ): void;
  debug(message: string, data?: LogDataI, profile?: string): void;
  info(message: string, data?: LogDataI, profile?: string): void;
  warn(message: string, data?: LogDataI, profile?: string): void;
  error(message: string, data?: LogDataI, profile?: string): void;
  fatal(message: string, data?: LogDataI, profile?: string): void;
  emergency(message: string, data?: LogDataI, profile?: string): void;
  startProfile(id: string): void;
}
