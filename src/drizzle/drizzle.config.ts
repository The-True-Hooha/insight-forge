import { ConfigService } from '@nestjs/config';
import type { Config } from 'drizzle-kit'
import { LogService } from 'src/libs/logger/log.service';
const logService = new LogService(new ConfigService());

export default {
  schema: './schema/schema.ts',
  out: '../drizzle/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: logService.getDbUrl(),
  },
} satisfies Config;