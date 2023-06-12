import { Inject, Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { DatabaseModule, LoggerModule } from "@app/common";
import { ReservationRepository } from "./reservations.repository";
import {
  ReservationDocument,
  ReservationSchema,
} from "./models/reservation.model";
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi'

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI:Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
