import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { toTransfromUser } from 'src/utils/user.util'
import { UserModel } from '../models/user.model'
import { UserService } from '../services/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const resp = await this.userService.getAll()
    return resp.map((user) => toTransfromUser(user))
  }

  @Post()
  async register(@Body() user: UserModel) {
    return await this.userService.register(user)
  }
}
