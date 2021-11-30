import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.enableCors({
    origin: '*'
  });

  const configService: ConfigService = app.get('ConfigService');
  await app.listen(configService.get<number>('app.port'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();