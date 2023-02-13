import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHelCheck() {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    }
    try {
      return healthcheck
    } catch (error) {
      healthcheck.message = error
      return HttpStatus.SERVICE_UNAVAILABLE
    }
  }
}
