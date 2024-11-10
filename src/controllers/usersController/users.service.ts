import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../interface/interface';
import { createUUID } from '../../helpers/uuidHelpers';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  findAll(): User[] {
    return this.databaseService.user.getAllUsers();
  }

  getUserById(id: string): User {
    const user = this.databaseService.user.getUser(id);
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
    this.databaseService.user.createUser(newUser);

    return newUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.getUserById(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const newUserData = {
      ...user,
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
    this.databaseService.user.updateUser(id, newUserData);

    return newUserData;
  }

  delete(id: string): void {
    this.getUserById(id);
    this.databaseService.user.deleteUser(id);
  }
}
