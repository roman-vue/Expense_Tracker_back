import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './settings/filter';
import {
  LoggingInterceptor,
  TimeoutInterceptor,
} from './settings/interceptors';
import { LoggerService } from './settings/logger';
import { SwaggerConfig } from './settings/swagger';
import { ResponseInterceptor } from './settings/interceptors/response';
async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule); 
  
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
    );
    let prefix = process.env.API_PREFIX || 'api';
    app.useGlobalFilters(new AllExceptionFilter(logger));
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix(prefix);
    // let user = process.env.ADMIN_USER
  SwaggerConfig.ConfigSwaggerModule(app);
  let port = process.env.PORT || 3000;
  await app.listen(port, () => {

    logger.log('APP', `running on http://localhost:${port}`);
    logger.debug(
      'APP',
      `Swagger is running on http://localhost:${port}/${prefix}/docs`,
    );
  });
}
bootstrap();
