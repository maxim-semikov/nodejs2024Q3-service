import { User } from '../../interface/interface';

export class UserEntityService {
  private static instance: UserEntityService;
  private users: Map<string, User>;

  private constructor() {
    this.users = new Map();
  }

  public static createUserEntityService(): UserEntityService {
    if (!UserEntityService.instance) {
      UserEntityService.instance = new UserEntityService();
    }
    return UserEntityService.instance;
  }

  getAll(): User[] {
    return Array.from(this.users.values());
  }

  create(userData: User) {
    this.users.set(userData.id, userData);
  }

  get(userId: string): User | undefined {
    return this.users.get(userId);
  }

  update(userId: string, value: User) {
    this.users.set(userId, value);
  }

  delete(userId: string) {
    this.users.delete(userId);
  }
}
