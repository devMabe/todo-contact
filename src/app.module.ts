import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './users/user.module'
import { User } from './users/models/user.entity'
import { UserService } from './users/services/user.service'
import { AuthModule } from './auth/auth.module'
import { checkJWT } from './auth/middleware/session'
import { Contact } from './contacts/models/contact.entity'
import { ContacModule } from './contacts/contact.module'
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Contact],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ContacModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkJWT).forRoutes('user'),
    consumer.apply(checkJWT).forRoutes({path: 'auth', method: RequestMethod.GET},{path: 'contacts', method: RequestMethod.ALL})
  }
}
