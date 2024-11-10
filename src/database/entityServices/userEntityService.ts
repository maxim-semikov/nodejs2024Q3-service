import { User } from '../../interface/interface';
import { EntityService } from './EntityService';

export class UserEntityService extends EntityService<User> {
  constructor() {
    super();
  }
}
