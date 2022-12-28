import FS from 'fs';
import {XRayAPI} from './app.module';
import {NestFactory} from '@nestjs/core';
import cookieParser from 'cookie-parser';
import {useContainer} from 'class-validator';
import {ValidationPipe} from '@nestjs/common';
import {ALLOWED_CORS_HOSTS, HTTPS_CERT, HTTPS_KEY} from '@xray/common';

async function bootstrap() {
  const app = await NestFactory.create(XRayAPI, {
    httpsOptions: {
      key: FS.readFileSync(HTTPS_KEY),
      cert: FS.readFileSync(HTTPS_CERT),
    },
  });

  app.enableCors({
    origin: ALLOWED_CORS_HOSTS,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.use(cookieParser());

  useContainer(app.select(XRayAPI), {fallbackOnErrors: true});

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT!, '0.0.0.0');
}

bootstrap();
