import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { SecurityModule } from './security/security.module';
import { TranslatorModule } from './translator/translator.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ChatbotsModule } from './chatbots/chatbots.module';
import { ContentGenerationModule } from './content-generation/content-generation.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { LlmModule } from './llm/llm.module';
import { CoreModule } from './core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContextModule } from './libs/context/context.module';
import { CustomLoggerModule } from './libs/logger/logger.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import * as schema from './drizzle/schema/schema'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE || 'dev'}`],
      isGlobal: true,
      cache: true,
    }),
    DrizzleTursoModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      tag: 'insight_forge_stage',
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('DB_TOKEN'));
        return {
          turso: {
            config: {
              url: configService.get('URL'),
              authToken: configService.get('DB_TOKEN'),
            },
          },
          config: {
            schema: {
              ...schema,
            },
          },
        };
      },
    }),
    TeamsModule,
    SecurityModule,
    TranslatorModule,
    RecommendationsModule,
    ChatbotsModule,
    ContentGenerationModule,
    AnalyticsModule,
    LlmModule,
    CoreModule,
    ContextModule,
    CustomLoggerModule,
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
