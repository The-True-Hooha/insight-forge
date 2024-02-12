import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestJsLoggerServiceAdapter } from './libs/logger/logger-adpater.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = process.env.PORT || 3000;
  app.useLogger(app.get(NestJsLoggerServiceAdapter));
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
