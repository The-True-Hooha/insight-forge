import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
