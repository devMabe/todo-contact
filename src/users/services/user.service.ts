import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../models/user.entity'
import { UserModel } from '../models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async register(user: Omit<UserModel, 'id'>) : Promise<User> {
    console.log("parametros en el servicio",user)
    console.log(this.userRepository.create(user))
    return this.userRepository.create(user)
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
