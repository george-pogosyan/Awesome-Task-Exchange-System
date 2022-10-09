import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_INJECT_SYMBOL } from '../constants';
import { UserCreatedMessage, UserDeactivatedMessage, USER_STREAM_TOPIC } from '@lib/contracts';

@Injectable()
export class CudStreamAdapter implements OnModuleInit {
  readonly #logger = new Logger(CudStreamAdapter.name);

  constructor(
    @Inject(KAFKA_INJECT_SYMBOL)
    readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  #sendMessage<T>(topic: string, message: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      const normalizedMessage =
        Array.isArray(message) || typeof message === 'object'
          ? JSON.stringify(message)
          : message;
      this.kafka.send(topic, normalizedMessage).subscribe((response: T) => {
        try {
          resolve(response);
        } catch (error) {
          this.#logger.error(error);
          this.#logger.error('can not parse response', response);
          reject(error);
        }
      });
    });
  }

  async publishUserCreatedEvent(message: UserCreatedMessage) {
    const stringifiedObj = JSON.stringify(message);
    this.kafka.emit(USER_STREAM_TOPIC, stringifiedObj);
  }

  async publishUserDeactivatedEvent(message: UserDeactivatedMessage) {
    this.kafka.emit(USER_STREAM_TOPIC, message);
  }
}
