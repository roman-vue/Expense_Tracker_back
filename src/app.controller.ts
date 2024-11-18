import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Health')
@Controller('health')
export class AppController {

  @Get()
  getHello(): string {
    return "It's Ok";
  }
}
