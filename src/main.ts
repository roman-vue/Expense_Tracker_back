import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './settings/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/tracker')
  SwaggerConfig.ConfigSwaggerModule(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
