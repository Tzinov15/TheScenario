import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      // NOTE: I could have left this as 'true' once the fix happened on the UI side but I figured
      // towards enabling a more secure API, I would lock down requests only from the specific port the UI is running on
      origin: 'http://localhost:8080',
    },
  });

  await app.listen(3000);
}
bootstrap();
