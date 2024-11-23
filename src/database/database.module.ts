import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/tracker')],
    providers:[DatabaseModule]
})
export class DatabaseModule implements OnModuleInit {
    onModuleInit() {
      mongoose.connection.on('connected', () => {
        console.log('Conexión exitosa a MongoDB');
      });
  
      mongoose.connection.on('error', (err) => {
        Logger.debug('Error de conexión a MongoDB:', err);
      });
  
      mongoose.connection.on('disconnected', () => {
        console.error('Se perdió la conexión con MongoDB');
      });
    }
}
