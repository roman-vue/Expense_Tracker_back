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
import { join } from 'path';
import * as Joi from 'joi'
  
console.log('process.env', process.env.MONGOURL)
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', join(__dirname, '..', '.env')],
      validationSchema: Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        API_PREFIX: Joi.string().default('api'),
        MONGOURL: Joi.string().required(),
        REDIS_DB: Joi.number().default(0),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),
      }),
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    DashboardModule,
    ApiModule,
    RedisModule,
    CategoriesModule,
    WalletModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
