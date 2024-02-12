import { ConsoleLogger, LoggerService } from "@nestjs/common";
import { CustomLoggerI } from "./interface/logs.interface";

export class NestJsLoggerServiceAdapter
  extends ConsoleLogger
  implements LoggerService
{
  constructor(private logger: CustomLoggerI) {
    super();
  }

  log(message: any, ...optionalParams: any[]) {
    return this.logger.info(message, this.getLogData(optionalParams));
  }
  public error(message: any, ...optionalParams: any[]) {
    return this.logger.error(message, this.getLogData(optionalParams));
  }

  public warn(message: any, ...optionalParams: any[]) {
    return this.logger.warn(message, this.getLogData(optionalParams));
  }

  public debug(message: any, ...optionalParams: any[]) {
    return this.logger.debug(message, this.getLogData(optionalParams));
  }

  public verbose(message: any, ...optionalParams: any[]) {
    return this.logger.info(message, this.getLogData(optionalParams));
  }

  private getLogData(...optionalParams: any[]) {
    return {
      sourceClass: optionalParams[0] ? optionalParams[0] : undefined,
    };
  }
}