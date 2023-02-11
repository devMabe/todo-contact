import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/models/user.entity'
import { Repository } from 'typeorm'
import { Contact } from '../models/contact.entity'
import { ContactModel } from '../models/contact.model'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(email: string) : Promise<Contact[]> {
    const userFound = await this.userRepository.findOneBy({email})
    return await this.contactRepository.findBy({ 
      user: userFound
    })
  }

  async create(
    email: string,
    { phoneNumber, firstName, lastName }: ContactModel,
  ) {
    const contactFound = await this.contactRepository.findOneBy({ phoneNumber })
    if (contactFound) {
      throw new HttpException('contact_al_ready_extist', HttpStatus.CONFLICT)
    } else {
      const relation = await this.userRepository.findOneBy({ email })
      if (relation) {
        const newContact = this.contactRepository.create({
          firstName,
          lastName,
          phoneNumber,
          user: relation,
        })
        const dataResponse = await this.contactRepository.save(newContact)
        return this.transformContact(dataResponse)
      }
    }
  }

  transformContact(contact: Contact) {
    const resp = {
      phoneNumber: contact.phoneNumber,
      firstName: contact.firstName,
      lastName: contact.lastName,
      userId: contact.user.id,
    }

    return resp
  }
}
