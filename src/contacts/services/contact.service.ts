import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/models/user.entity'
import { transformContact } from 'src/utils/contact.util'
import { Repository } from 'typeorm'
import { Contact } from '../models/contact.entity'
import { ContactModel } from '../models/contact.model'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(email: string): Promise<Contact[]> {
    const userFound = await this.userRepository.findOneBy({ email })
    return await this.contactRepository.findBy({
      user: userFound,
    })
  }

  async getOne(email: string, phoneNumber: string): Promise<Contact> {
    const userFound = await this.userRepository.findOneBy({ email })
    if (!userFound)
      throw new HttpException('Failed User', HttpStatus.BAD_REQUEST)
    const resp = await this.contactRepository.findOneBy({
      phoneNumber,
      user: userFound,
    })
    if (!resp)
      throw new HttpException('Contact Not Found', HttpStatus.NOT_FOUND)
    return resp
  }

  async deleteOne(email: string, phoneNumber: string): Promise<void> {
    try {
      const { id } = await this.getOne(email, phoneNumber)
      await this.contactRepository.delete(id)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(
    email: string,
    phoneNumber: string,
    contact: ContactModel,
  ): Promise<Contact> {
    try {
      const resp = await this.getOne(email, phoneNumber)
      const contactUpdate = Object.assign(resp, contact)
      return await this.contactRepository.save(contactUpdate)
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(
    email: string,
    { phoneNumber, firstName, lastName }: ContactModel,
  ) {
    const relation = await this.userRepository.findOneBy({ email })
    if (relation) {
      try {
        const resp = await this.contactRepository.findOneBy({
          phoneNumber,
          user: relation,
        })
        if (resp)
          throw new HttpException('contact already exist', HttpStatus.CONFLICT)
        const newContact = this.contactRepository.create({
          firstName,
          lastName,
          phoneNumber,
          user: relation,
        })
        const dataResponse = await this.contactRepository.save(newContact)
        return transformContact(dataResponse)
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
