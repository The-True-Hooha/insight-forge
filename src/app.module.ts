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
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from './libs/context/context.module';
import { CustomLoggerModule } from './libs/logger/logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE || 'dev'}`],
      isGlobal: true,
      cache: true,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
