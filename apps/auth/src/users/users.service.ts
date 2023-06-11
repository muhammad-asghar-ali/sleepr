import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    return this.usersRepo.create(createUserDto);
  }
}
