import { Contact } from 'src/contacts/models/contact.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { UserModel } from './user.model'

@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[]
}
