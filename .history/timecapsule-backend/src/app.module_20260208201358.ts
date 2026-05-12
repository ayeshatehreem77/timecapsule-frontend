import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CapsulesModule } from './capsules/capsules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, CapsulesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
