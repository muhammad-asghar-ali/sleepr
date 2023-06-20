import { CreateChargeDto, NOTIFICATIONS_SERVCIE } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import Stripe from "stripe";
import { PaymentsCreateChargeDto } from "./dto";

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get("STRIPE_SEVRET_KEY"),
    {
      apiVersion: "2022-11-15",
    }
  );
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVCIE)
    private readonly notificationService: ClientProxy
  ) {}

  public async createCharge({
    card,
    amount,
    email
  }: PaymentsCreateChargeDto): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: "card",
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"],
      currency: "usd",
    });

    this.notificationService.emit("notify_email", { email });

    return paymentIntent;
  }
}
