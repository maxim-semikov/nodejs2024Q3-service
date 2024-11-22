import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../controllers/usersController/users.service';
import { AuthDto } from './dto/authDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByLogin(login);
    const isPasswordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordCorrect) {
      throw new ForbiddenException();
    }

    const payload = { id: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(authDto: AuthDto): Promise<any> {
    const user = await this.usersService.create(authDto);

    const payload = { id: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      id: user.id,
    };
  }
}
