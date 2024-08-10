import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.APP_PORT;

  await app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  });
}

bootstrap();
