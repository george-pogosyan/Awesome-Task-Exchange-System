import { Module } from '@nestjs/common'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { KAFKA_INJECT_SYMBOL } from './constants'
import { AuthServiceAdapter } from './adapters/auth-service.adapter'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_INJECT_SYMBOL,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
            clientId: 'user-service',
          },
          consumer: {
            groupId: 'user-service-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: 'secret' },
    }),
  ],
  providers: [JwtStrategy, AuthServiceAdapter],
})
export class AuthModule {}
