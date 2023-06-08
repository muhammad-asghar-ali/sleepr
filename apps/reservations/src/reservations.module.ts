import { Module } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
import { DatabaseModule, LoggerModule } from "@app/common";
import { ReservationRepository } from "./reservations.repository";
import {
  ReservationDocument,
  ReservationSchema,
} from "./models/reservation.model";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
