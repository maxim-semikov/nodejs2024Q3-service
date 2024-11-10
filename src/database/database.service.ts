import { Injectable } from '@nestjs/common';
import { UserService } from './entityServices/UserService';

@Injectable()
export class DatabaseService {
  public user: UserService = UserService.createUserService();
}
