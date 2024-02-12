import { LogLevelEnum } from './enums/loglevel.enum';
import {
  CustomLoggerI,
  LogDataI,
  LoggerBaseKey,
} from './interface/logs.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INQUIRER } from '@nestjs/core';
import {
  ContextStorageInterface,
  ContextStorageServiceKey,
} from '../context/interface/context.storage.interface';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements CustomLoggerI {
  private sourceClass: string;
  private organization: string;
  private context: string;
  private app: string;

  constructor(
    @Inject(LoggerBaseKey)
    private logger: CustomLoggerI,
    // configService: ConfigService,
    // @Inject(INQUIRER)
    // parentClass: object,
    // @Inject(ContextStorageServiceKey)
    // private contextStorageInterface: ContextStorageInterface,
  ) {
    this.sourceClass = 'name'; // parentClass?.constructor?.name;

    this.organization = 'ORGANIZATION'; //configService.get<string>('ORGANIZATION');
    this.context = 'CONTEXT'; //configService.get<string>('CONTEXT');
    this.app = 'APP'; //configService.get<string>('APP');
  }

  log(
    level: LogLevelEnum,
    message: string | Error,
    data?: LogDataI,
    profile?: string,
  ) {
    return this.logger.log(level, message, this.getLogData(data), profile);
  }
  debug(message: string, data?: LogDataI, profile?: string) {
    return this.logger.debug(message, this.getLogData(data), profile);
  }
  info(message: string, data?: LogDataI, profile?: string): void {
    return this.logger.info(message, this.getLogData(data), profile);
  }
  warn(message: string, data?: LogDataI, profile?: string): void {
    return this.logger.warn(message, this.getLogData(data), profile);
  }
  error(message: string, data?: LogDataI, profile?: string): void {
    return this.logger.error(message, this.getLogData(data), profile);
  }
  fatal(message: string, data?: LogDataI, profile?: string): void {
    return this.logger.fatal(message, this.getLogData(data), profile);
  }
  emergency(message: string, data?: LogDataI, profile?: string): void {
    return this.logger.emergency(message, this.getLogData(data), profile);
  }
  startProfile(id: string) {
    this.logger.startProfile(id);
  }

  private getLogData(data?: LogDataI) {
    return {
      organization: data ? data?.organizations : this.organization,
      context: data ? data?.context : this.context,
      app: data ? data?.app : this.app,
      sourceClass: data ? data?.sourceClass : this.sourceClass,
      // correlationId: data
      //   ? data.correlationId
      //   : this.contextStorageInterface.getContextId(),
    };
  }
}
