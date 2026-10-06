import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'catalog-queue',
      queueOptions: { durable: true },
    },
  });
  await app.listen();
}
bootstrap();
