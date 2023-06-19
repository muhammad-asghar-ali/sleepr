import { PAYMENTS_SERVCIE } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateReservationDto, UpdateReservationDto } from "./dto";
import { ReservationRepository } from "./reservations.repository";

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    @Inject(PAYMENTS_SERVCIE) paymentsService: ClientProxy
  ) {}

  public async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.reservationRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: userId,
    });
  }

  public async findAll() {
    return this.reservationRepo.find({});
  }

  public async findOne(_id: string) {
    return this.reservationRepo.findOne({ _id });
  }

  public async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto }
    );
  }

  public async  remove(_id: string) {
    return this.reservationRepo.findOneAndDelete({ _id });
  }
}
