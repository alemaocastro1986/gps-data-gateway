import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      service_name: 'gps-data-gateway',
      versio: '1.0.0',
    };
  }
}
