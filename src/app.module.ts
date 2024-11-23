import { Logger, MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ApiModule } from './api/api.module';
import { PassportModule } from './passport/passport.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, 
    AuthModule, UsersModule, DashboardModule, NotificationsModule, ApiModule, PassportModule],
  controllers: [AppController],
})
export class AppModule {
  init(){
    Logger.debug('epa')
  }
}
