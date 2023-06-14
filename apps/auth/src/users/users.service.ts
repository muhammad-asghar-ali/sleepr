import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { CreateUserDto, GetUserDto } from "./dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepo.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException("Emial is already exist");
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException("Credential are not valid");
    }
    return user;
  }

  public async getUser(getUserDto: GetUserDto) {
    return this.usersRepo.findOne(getUserDto);
  }
}
