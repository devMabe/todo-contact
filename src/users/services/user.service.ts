import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { encrypt, verified } from 'src/utils/bcrypt'
import { generateToken } from 'src/utils/jwt'
import { Repository } from 'typeorm'
import { Token } from '../models/auth.model'
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

  async register({
    email,
    firstName,
    lastName,
    password,
  }: Omit<UserModel, 'id'>): Promise<Token> {
    const checkIs = await this.userRepository.findOneBy({ email })
    if (checkIs)
      throw new HttpException('email al ready exist', HttpStatus.BAD_REQUEST)
    const passHash = await encrypt(password)
    const newUser = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: passHash,
    })
    const user = await this.userRepository.save(newUser)
    const token = await generateToken({ email })
    const data: Token = {
      token,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }
    return data
  }

  async login({ email, password }: UserModel): Promise<Token> {
    const checkIs = await this.userRepository.findOneBy({ email })
    if (!checkIs) throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
    const passwordHash = checkIs.password
    const isCorrect = await verified(password, passwordHash)
    if (!isCorrect)
      throw new HttpException('credential incorrect', HttpStatus.BAD_REQUEST)
    const token = await generateToken({ email })
    const data: Token = {
      token,
      data: {
        id: checkIs.id,
        firstName: checkIs.firstName,
        lastName: checkIs.lastName,
        email: checkIs.email,
      },
    }
    return data
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
