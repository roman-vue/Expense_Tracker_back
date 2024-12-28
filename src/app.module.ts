import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, 
    AuthModule, UsersModule, DashboardModule, ApiModule],
  controllers: [AppController],
})
export class AppModule {
  init(){
    Logger.debug('epa')
  }
}
