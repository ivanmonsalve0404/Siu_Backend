import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {

  const port = Number(process.env.PORT_SERVER);
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({extended: true}));
  app.enableCors();
  await app.listen(port, () => {
    console.log('Servidor corriendo en el puerto: ' + port);
  });
}
bootstrap();