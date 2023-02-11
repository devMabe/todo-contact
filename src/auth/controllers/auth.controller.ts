import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '../../users/models/user.model'
import { UserService } from '../../users/services/user.service'


@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Get()
  saludar(@Req() req: Request) {
    const { user }  = req
    const newArray = Object.values(user)
    return `Hello ${newArray[0]} !`
  }

  @Post('register')
  async register(@Body() user: UserModel) {
    const resp = await this.userService.register(user)
    return resp
  }

  @Post('login')
  async login(@Body() user: UserModel) {
    const resp = await this.userService.login(user)
    return resp
  }
}
