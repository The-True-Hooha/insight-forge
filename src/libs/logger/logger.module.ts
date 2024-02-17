import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import {
  LoggerKey,
  CustomLoggerI,
  LoggerBaseKey,
} from './interface/logs.interface';
import { CustomLoggerService } from './logger.service';
import { NestJsLoggerServiceAdapter } from './logger-adpater.service';
import * as morgan from 'morgan';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from '../context/context.module';
import {
  WinstonLogger,
  WinstonLoggerTransportsKey,
} from './winston.logger.service';
import ConsoleTransport from './transports/console.transport';
import FileTransport from './transports/file.transport';
import { LogService } from './log.service';

@Global()
@Module({
  imports: [ContextModule, ConfigModule],
  controllers: [],
  providers: [
  LogService,
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: CustomLoggerService,
    },
    {
      provide: NestJsLoggerServiceAdapter,
      useFactory: (logger: CustomLoggerI) =>
        new NestJsLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
    {
      provide: WinstonLoggerTransportsKey,
      useFactory: () => {
        const transports = [];
        transports.push(ConsoleTransport.createColorize());
        transports.push(FileTransport.create());
        return transports;
      },
    },
    
  ],
  exports: [LoggerKey, NestJsLoggerServiceAdapter],
})
export class CustomLoggerModule implements NestModule {
  constructor(
    @Inject(LoggerKey)
    private logger: CustomLoggerI,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(process.env.STAGE === 'prod' ? 'combined' : 'dev', {
          stream: {
            write: (message: string) => {
              this.logger.debug(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        }),
      )
      .forRoutes('*');
  }
}
