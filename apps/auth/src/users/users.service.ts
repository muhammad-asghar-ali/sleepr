import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    return this.usersRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    });
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException("Credential are not valid");
    }
    return user;
  }
}
