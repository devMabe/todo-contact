import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { UserModel } from './user.model'

@Entity()
export class User implements UserModel {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}
