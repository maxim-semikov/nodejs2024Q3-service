import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../interface/interface';
import { createUUID } from '../../helpers/uuidHelpers';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: createUUID(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.users.push(newUser);

    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    return user;
  }

  delete(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(index, 1);
  }
}
