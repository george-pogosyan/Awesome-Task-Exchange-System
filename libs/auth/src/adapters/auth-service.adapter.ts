import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { KAFKA_INJECT_SYMBOL } from '../constants'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { IUser } from '../interfaces/user.interface'

@Injectable()
export class AuthServiceAdapter implements OnModuleInit {
  readonly #logger = new Logger(AuthServiceAdapter.name)

  constructor(
    @Inject(KAFKA_INJECT_SYMBOL)
    readonly kafka: ClientKafka,
  ) { }

  async onModuleInit() {
    const topics = ['validate-user-jwt-token']
    topics.forEach((topic) => this.kafka.subscribeToResponseOf(topic))
    await this.kafka.connect()
  }

  async onModuleDestroy() {
    await this.kafka.close()
  }

  validateUser(jwtPayload: JwtPayload): Promise<IUser> {
    const topic = 'validate-user-jwt-token'
    return new Promise((resolve, reject) => {
      this.kafka.send(topic, jwtPayload).subscribe((response: IUser) => {
        try {
          resolve(response)
        } catch (error) {
          this.#logger.error(error)
          this.#logger.error('can not parse response', response)
          reject(error)
        }
      })
    })
  }
}
