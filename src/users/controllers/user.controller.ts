import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
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

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return toTransfromUser(await this.userService.findOne(id))
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND, {
        cause: new Error('User not found'),
      })
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.remove(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }
  }

  @Post()
  async register(@Body() user: UserModel) {
    return this.userService.register(user)
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Omit<UserModel, 'id' | 'password'>,
  ) {
    const resp = await this.userService.update(id, user)
    return toTransfromUser(resp)
  }
}
