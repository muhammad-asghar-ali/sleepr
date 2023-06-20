import { CreateChargeDto } from "@app/common";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get("STRIPE_SEVRET_KEY"),
    {
      apiVersion: "2022-11-15",
    }
  );
  constructor(private readonly configService: ConfigService) {}

  public async createCharge({ card, amount }: CreateChargeDto): Promise<Stripe.Response<Stripe.PaymentIntent>> {
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

    return paymentIntent;
  }
}
