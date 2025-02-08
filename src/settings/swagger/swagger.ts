import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  public static ConfigSwaggerModule(app: INestApplication): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('TRACKER')
      .setVersion(`v0.0.1`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/tracker/docs`, app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
