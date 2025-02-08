import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Health')
@Controller('health')
export class AppController {

  @Get()
  getHello() {
    return {
      message: "It's Ok",
      status: 200,
      timestamp: new Date().toISOString(),
    };
  }
}
