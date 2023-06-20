import { Injectable } from "@nestjs/common";
import { NotifyEmailDto } from "./dto";

@Injectable()
export class NotificationsService {
  public async notifyEmail({ email }: NotifyEmailDto) {
    console.log(email);
  }
}
