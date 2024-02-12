import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { LoggerKey, CustomLoggerI } from './interface/logs.interface';
import { CustomLoggerService } from './logger.service';
import { NestJsLoggerServiceAdapter } from './logger-adpater.service';
import * as morgan from 'morgan';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from '../context/context.module';
import { INQUIRER } from '@nestjs/core';
import { ContextStorageServiceKey } from '../context/interface/context.storage.interface';

@Global()
@Module({
  imports: [ConfigModule, ContextModule],
  controllers: [],
  providers: [
    {
      provide: LoggerKey,
      useClass: CustomLoggerService,
      // inject: [INQUIRER, ContextStorageServiceKey]
    },
    {
      provide: NestJsLoggerServiceAdapter,
      useFactory: (logger: CustomLoggerI) =>
        new NestJsLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
  ],
  exports: [LoggerKey, NestJsLoggerServiceAdapter],
})
export class CustomLoggerModule implements NestModule {
  constructor(
    @Inject(LoggerKey)
    private logger: CustomLoggerI,
    // private configService: ConfigService,
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
