import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath:'.env', isGlobal:true}),DatabaseModule, 
    AuthModule, UsersModule, DashboardModule, ApiModule, RedisModule, CategoriesModule, WalletModule],
  controllers: [AppController],
})
export class AppModule {}
