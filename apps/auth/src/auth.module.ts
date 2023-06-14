import { LoggerModule } from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as Joi from "joi";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStratgey, LocalStratgey } from "./strategies";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIREION: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: `${configService.get("JWT_EXPIREION")}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStratgey, JwtStratgey],
})
export class AuthModule {}
