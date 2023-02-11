import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { ContactModel } from '../models/contact.model'
import { ContactService } from '../services/contact.service'

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Req() req: Request, @Body() contact: ContactModel) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.create(userArray[0], contact)
  }

  @Put(':phoneNumber')
  updateContact(
    @Req() req: Request,
    @Param('phoneNumber') phoneNumber: string,
    @Body() contact: ContactModel,
  ) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.update(userArray[0], phoneNumber, contact)
  }

  @Get()
  getContacts(@Req() req: Request) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.getAll(userArray[0])
  }

  @Get(':phoneNumber')
  getContact(@Req() req: Request, @Param('phoneNumber') phoneNumber: string) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.getOne(userArray[0], phoneNumber)
  }

  @Delete(':phoneNumber')
  deleteContact(
    @Req() req: Request,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.deleteOne(userArray[0], phoneNumber)
  }
}
