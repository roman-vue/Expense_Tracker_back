import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/tracker')],
    providers:[DatabaseModule]
})
export class DatabaseModule  {}
