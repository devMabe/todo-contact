import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './models/user.entity'

@Module({
  imports: [ TypeOrmModule.forFeature([User]) ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
