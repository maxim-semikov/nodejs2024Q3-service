import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../controllers/usersController/users.service';

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
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
