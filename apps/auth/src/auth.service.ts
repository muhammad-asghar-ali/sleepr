import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserDocument } from "./users/models";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIREION")
    );

    const token = this.jwtService.sign(tokenPayload);
    response.cookie("Authentication", token, {
      httpOnly: true,
      expires,
    });
  }
}
