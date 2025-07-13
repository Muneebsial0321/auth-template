import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { EventEmitter2, } from "@nestjs/event-emitter";
import { Topics } from "./topics";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs"

@Injectable()
export class KafkaProducer implements OnModuleInit {
    constructor(
        private readonly event: EventEmitter2,
        @Inject("KAFKA_SERVICE") private readonly kafka: ClientKafka
    ) {
    }
    async onModuleInit() {
        console.log('✅ KafkaProducer Init Called');
        await this.kafka.connect()
        console.log('✅ Kafka Producer Connected');
        this.event.onAny((eventName, payload) => {
            this.sendMessage({
                topic: Topics.LOGS,
                eventPattern: typeof eventName === "string" ? eventName : eventName[0],
                Payload: payload,
                payloadId: payload.toString()

            })

        });
    }

    sendMessage(
        { topic, eventPattern, Payload, payloadId }:
        { topic: string, payloadId: string, Payload: any, eventPattern: string }
    ) {
        console.log("Sending to kafka")
        firstValueFrom(this.kafka.emit(
            topic, {
            messages: {
                key: payloadId,
                value: JSON.stringify({ eventPattern, Payload })
            },
        }))
    }
}