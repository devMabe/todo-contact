import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/models/user.entity'
import { ContactController } from './controllers/contact.controller'
import { Contact } from './models/contact.entity'
import { ContactService } from './services/contact.service'

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContacModule {}
