import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import * as process from 'node:process';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create({ login, password }: CreateUserDto) {
    const salt = process.env.CRYPT_SALT || 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.prisma.user.create({
      data: { login, password: hashedPassword },
    });
    return new UserEntity(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getUserById(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: { increment: 1 },
      },
    });

    return new UserEntity(updatedUser);
  }

  async delete(id: string) {
    await this.getUserById(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async getUserByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }
}
