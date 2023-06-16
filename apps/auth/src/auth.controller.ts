import { CurrentUser } from '@app/common';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { UserDocument } from './users/models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @CurrentUser() user: UserDocument,
    @Res({passthrough: true}) response: Response
  ) { 
    await this.authService.login(user, response);
    response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenicate')
  public async authenticate(@Payload() data: any) {
    return data.user
  }
}
