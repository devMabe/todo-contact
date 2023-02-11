import { Contact } from "src/contacts/models/contact.entity"

export function transformContact(contact: Contact) {
    const resp = {
      phoneNumber: contact.phoneNumber,
      firstName: contact.firstName,
      lastName: contact.lastName,
      userId: contact.user.id,
    }

    return resp
  }