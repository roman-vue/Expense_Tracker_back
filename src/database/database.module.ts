import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot(`${process.env.MONGOURL}/tracker'`)],
    providers:[DatabaseModule]
})
export class DatabaseModule  {}
