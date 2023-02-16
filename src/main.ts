import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Todo-Contacts')
    .setDescription('Api restFull todo-Contacts')
    .setVersion('1.0')
    .addTag('contacts')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/', app, document)

  app.enableCors()
  const PORT = parseInt(process.env.PORT) || 3000
  await app.listen(PORT)
}
bootstrap()
