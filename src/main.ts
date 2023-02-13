import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const PORT = parseInt(process.env.PORT) || 3000
  await app.listen(PORT)
}
bootstrap()
