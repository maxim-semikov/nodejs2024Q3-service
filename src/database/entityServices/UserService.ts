import { User } from '../../interface/interface';

export class UserService {
  private static instance: UserService;
  private users: Map<string, User>;

  private constructor() {
    this.users = new Map();
  }

  public static createUserService(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  createUser(userData: User) {
    this.users.set(userData.id, userData);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  updateUser(userId: string, value: User) {
    this.users.set(userId, value);
  }

  deleteUser(userId: string) {
    this.users.delete(userId);
  }
}
