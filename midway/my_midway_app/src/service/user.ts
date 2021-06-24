import { Provide } from '@midwayjs/decorator';
import { User } from '../interface';

@Provide()
export class UserService {
  async getUser(id: number): Promise<User> {
    return {
      id,
      name: 'mockedName',
      age: 112,
    };
  }
}
