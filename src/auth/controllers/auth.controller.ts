import { Body, Controller, Post } from '@nestjs/common'
import { UserModel } from '../../users/models/user.model'
import { UserService } from '../../users/services/user.service'

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

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
