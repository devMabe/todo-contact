import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/models/user.entity'
import { UserService } from 'src/users/services/user.service'
import { AuthController } from '../auth/controllers/auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [AuthController],
})
export class AuthModule {}
