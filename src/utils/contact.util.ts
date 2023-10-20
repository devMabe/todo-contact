import { Request } from 'express'
import { Contact } from 'src/contacts/models/contact.entity'

export function transformContact(contact: Contact) {
  const resp = {
    phoneNumber: contact.phoneNumber,
    firstName: contact.firstName,
    lastName: contact.lastName,
    userId: contact.user.id,
  }

  return resp
}

export function requestParamContact(req: Request): string {
  const { user } = req
  const userArray = Object.values(user)
  return userArray[0]
}
