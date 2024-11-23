import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../controllers/usersController/users.service';
import { AuthDto } from './dto/authDto';

@Injectable()
export class AuthService {
  private readonly jwtSecretRefreshKey: string;
  private readonly tokenRefreshExpireTime: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecretRefreshKey = this.configService.get('JWT_SECRET_REFRESH_KEY');
    this.tokenRefreshExpireTime = this.configService.get(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
  }

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByLogin(login);
    const isPasswordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordCorrect) {
      throw new ForbiddenException();
    }

    const payload = { userId: user.id, login: user.login };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
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

  async refresh(oldRefreshToken: string) {
    try {
      const payload = await this.jwtService.verify(oldRefreshToken, {
        secret: this.jwtSecretRefreshKey,
      });
      const newPayload = { userId: payload.userId, login: payload.login };
      const accessToken = await this.jwtService.signAsync(newPayload);
      const refreshToken = await this.generateRefreshToken(newPayload);

      return { accessToken, refreshToken };
    } catch {
      throw new ForbiddenException('The refresh token is invalid or expired.');
    }
  }

  private async generateRefreshToken(payload: any) {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtSecretRefreshKey,
      expiresIn: this.tokenRefreshExpireTime,
    });
  }
}
