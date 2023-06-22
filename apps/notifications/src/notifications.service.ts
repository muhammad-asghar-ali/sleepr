import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from "./dto";

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly transporter =nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get("SMTP_USER"),
      clientId: this.configService.get("GOOGLE_OAUTH_CLIENT_ID"),
      clientSecret: this.configService.get("GOOGLE_OAUTH_CLIENT_SECRET"),
      refreshToken: this.configService.get("GOOGLE_OAUTH_REFRESH_TOKEN"),
    }
  })
  public async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get("SMTP_USER"),
      to: email,
      subject: "Sleepr notification",
      text
    })
  }
}
