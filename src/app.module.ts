import {Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ApiModule } from './api/api.module';
import { PassportModule } from './passport/passport.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal:true}), 
    AuthModule, UsersModule, DashboardModule, ApiModule, DatabaseModule, PassportModule],
  controllers: [AppController],
})
export class AppModule {

}
