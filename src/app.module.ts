import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { PassportModule } from './passport/passport.module';
import { Middleware } from './settings/middleware';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal:true}), 
    AuthModule, UsersModule, DashboardModule, NotificationsModule, ApiModule, DatabaseModule, PassportModule],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('*');
  }
}
