import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LogService {
  constructor(private readonly configService: ConfigService) {}
  sayHello(): string {
    return 'hello world';
  }

  getDbUrl(): string {
    return this.configService.get<string>('URL');
  }
}
