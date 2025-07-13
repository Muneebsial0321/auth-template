import { Module } from '@nestjs/common';
import { KafkaProducer } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service',
            brokers: ['localhost:9092'],
          },
          producer: {
            allowAutoTopicCreation: false, // recommended
          },
        },
      },
    ]),
  ],
  providers: [KafkaProducer]
})
export class ServiceModule { }
