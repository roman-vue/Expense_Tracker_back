import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb://root:examplepassword@localhost:27017')]
})
export class DatabaseModule {}
