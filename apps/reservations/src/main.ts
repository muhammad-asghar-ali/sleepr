import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { Logger } from "nestjs-pino";
import { ReservationsModule } from "./reservations.module";

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
