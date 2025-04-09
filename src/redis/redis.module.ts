import { Module, Global, Logger } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
          throw new Error('REDIS_URL is not defined in environment variables');
        }

        const redis = new Redis(redisUrl); // rediss:// y redis:// soportados automáticamente

        redis.on('connect', () =>
          Logger.log('✅ Connected to Redis', 'RedisModule'),
        );
        redis.on('error', (err) =>
          Logger.error('❌ Redis error:', err, 'RedisModule'),
        );

        return redis;
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
