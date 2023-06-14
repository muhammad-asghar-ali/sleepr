import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../decorators";
import { JwtAuthGuard } from "../guards";
import { CreateUserDto } from "./dto";
import { UserDocument } from "./models";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly _svc: UsersService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this._svc.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
