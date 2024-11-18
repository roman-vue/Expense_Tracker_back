import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Middleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const { method, originalUrl } = req;
      const start = Date.now();
  
      Logger.log(`Inicio: ${method} ${originalUrl} - ${new Date().toISOString()}`);
  
      res.on('finish', () => {
        const end = Date.now();
        const duration = end - start;
        Logger.log(`Fin: ${method} ${originalUrl} - ${new Date().toISOString()} - Duración: ${duration}ms - Estado: ${res.statusCode}`);
      });

      res.on('error', (err: Error) => {
        Logger.error(`Error: ${method} ${originalUrl} - ${new Date().toISOString()} - Mensaje: ${err.message}`);
      });
  
      try {
        next();
      } catch (err) {
        console.error(`Error Capturado: ${method} ${originalUrl} - ${new Date().toISOString()} - Mensaje: ${err.message}`);
        throw err;
      }
    }
  }
