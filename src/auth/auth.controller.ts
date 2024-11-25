import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto';
import { ExcludeUserPasswordInterceptor } from '../interceptors/exclude-user-password.interceptor';
import { Public } from './auth.decorator';

@Controller('auth')
@UseInterceptors(ExcludeUserPasswordInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.login, authDto.password);
  }

  @Public()
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') token: string) {
    console.log('refreshToken ', token);
    if (!token) throw new UnauthorizedException();
    return this.authService.refresh(token);
  }
}
