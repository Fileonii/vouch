import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set("trust proxy", true)
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
  console.log(`Listening on PORT:${PORT}`)
  await app.listen(PORT);
}
bootstrap();
