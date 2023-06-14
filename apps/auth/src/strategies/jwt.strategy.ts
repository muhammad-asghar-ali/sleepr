import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { TokenPayload } from "../interfaces";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStratgey extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({_id: userId})
  }
}
