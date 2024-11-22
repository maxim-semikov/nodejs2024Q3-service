import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create({ login, password }: CreateUserDto) {
    const hashedPassword = await this.getHashedPassword(password);
    const user = await this.prisma.user.create({
      data: { login, password: hashedPassword },
    });
    return new UserEntity(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getUserById(id);

    const isPasswordCorrect = user
      ? await bcrypt.compare(updatePasswordDto.oldPassword, user.password)
      : false;

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const hashedPassword = await this.getHashedPassword(
      updatePasswordDto.newPassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
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

  private async getHashedPassword(password: string) {
    const salt = parseInt(this.configService.get('CRYPT_SALT')) || 10;
    return bcrypt.hash(password, salt);
  }
}
