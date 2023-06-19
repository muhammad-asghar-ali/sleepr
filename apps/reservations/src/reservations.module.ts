import { Inject, Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import {
  AUTH_SERVCIE,
  DatabaseModule,
  LoggerModule,
  PAYMENTS_SERVCIE,
} from "@app/common";
import { ReservationRepository } from "./reservations.repository";
import {
  ReservationDocument,
  ReservationSchema,
} from "./models/reservation.model";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        PAYMENTS_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVCIE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get("AUTH_HOST"),
            port: configService.get("AUTH_PORT"),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVCIE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get("PAYMENTS_HOST"),
            port: configService.get("PAYMENTS_PORT"),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
