import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports: [MongooseModule.forRootAsync({
              imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `${config.getOrThrow<string>('MONGOURL')}/tracker`,
        // otras opciones…
      }),

    })],
    providers:[DatabaseModule]
})
export class DatabaseModule  {}
