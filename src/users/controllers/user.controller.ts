import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { UserModel } from '../models/user.model'
import { UserService } from '../services/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
   getUsers() {
    return this.userService.getAll()  
  }

  @Post()
  async register(@Body() user: UserModel) {
    return await this.userService.register(user)
  }
}
