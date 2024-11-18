import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    let version = 'v0.0.1';
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Expenses Tracker')
      .setVersion(`${version}`)
      .build();
    Logger.verbose('Swagger Documentation in this path "api/v1/tracker/docs"');
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/tracker/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}