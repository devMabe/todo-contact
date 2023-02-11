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
import { requestParamContact } from 'src/utils/contact.util'
import { ContactModel } from '../models/contact.model'
import { ContactService } from '../services/contact.service'

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Req() req: Request, @Body() contact: ContactModel) {
    const email = requestParamContact(req)
    return this.contactService.create(email, contact)
  }

  @Put(':phoneNumber')
  updateContact(
    @Req() req: Request,
    @Param('phoneNumber') phoneNumber: string,
    @Body() contact: ContactModel,
  ) {
    const email = requestParamContact(req)
    return this.contactService.update(email, phoneNumber, contact)
  }

  @Get()
  getContacts(@Req() req: Request) {
    const email = requestParamContact(req)
    return this.contactService.getAll(email)
  }

  @Get(':phoneNumber')
  getContact(@Req() req: Request, @Param('phoneNumber') phoneNumber: string) {
    const email = requestParamContact(req)
    return this.contactService.getOne(email, phoneNumber)
  }

  @Delete(':phoneNumber')
  deleteContact(
    @Req() req: Request,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    const email = requestParamContact(req)
    return this.contactService.deleteOne(email, phoneNumber)
  }
}
