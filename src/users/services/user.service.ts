import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    const userFound = this.userRepository.findOneBy({ id })
    if (userFound) {
      return userFound
    }
  }

  async register(user: Omit<UserModel, 'id'>): Promise<User> {
    const newUser = this.userRepository.create(user)
    await this.userRepository.save(newUser)
    return newUser
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }

  async update(
    id: number,
    user: Omit<UserModel, 'id' | 'password'>,
  ): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id })
    if (userFound) {
      const updateUser = Object.assign(userFound, user)
      await this.userRepository.save(updateUser)
    }
    return userFound
  }
}
