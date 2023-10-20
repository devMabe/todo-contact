import { User } from 'src/users/models/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ContactModel } from './contact.model'

@Entity()
export class Contact implements ContactModel {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  phoneNumber: string

  @Column()
  firstName?: string

  @Column()
  lastName?: string

  @ManyToOne(() => User, (user) => user.contacts)
  user: User
}
