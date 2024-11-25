import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ValidateUuidPipe } from '../../pipes/validate-uuid-pipe.service';
import { ExcludeUserPasswordInterceptor } from '../../interceptors/exclude-user-password.interceptor';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoggingService } from '../../logging/logging.service';

@Controller('user')
@UseInterceptors(ExcludeUserPasswordInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    this.loggingService.log('Getting all users');
    const users = await this.usersService.findAll();
    this.loggingService.log('Got all users');
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ValidateUuidPipe) id: string) {
    this.loggingService.log(`Getting user by id: ${id}`);
    const user = await this.usersService.getUserById(id);
    this.loggingService.log(`Got user: ${id}`);
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    this.loggingService.log('Creating a new user');
    const user = await this.usersService.create(createUserDto);
    this.loggingService.log(`Created user: ${user.id}`);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.loggingService.log(`Updating user: ${id}`);
    const updatedUser = await this.usersService.updatePassword(
      id,
      updatePasswordDto,
    );
    this.loggingService.log(`Updated user: ${id}`);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ValidateUuidPipe) id: string): Promise<void> {
    this.loggingService.log(`Deleting user: ${id}`);
    const res = await this.usersService.delete(id);
    this.loggingService.log(`Deleted user: ${id}`);
    return res;
  }
}
