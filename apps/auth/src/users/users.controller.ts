import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly _svc: UsersService) {}
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return this._svc.create(createUserDto); 
  }
}
