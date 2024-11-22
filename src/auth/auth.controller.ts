import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ExcludeUserPasswordInterceptor } from '../interceptors/exclude-user-password.interceptor';
import { Public } from './auth.decorator';

@Controller('auth')
@UseInterceptors(ExcludeUserPasswordInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.login, loginDto.password);
  }
}
