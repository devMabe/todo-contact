import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ContactModel } from '../models/contact.model'
import { ContactService } from '../services/contact.service'

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Req() req: Request,@Body() contact: ContactModel) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.create(userArray[0],contact)
  }

  @Get()
  getContacts(@Req() req: Request) {
    const { user } = req
    const userArray = Object.values(user)
    return this.contactService.getAll(userArray[0])
  }

}
