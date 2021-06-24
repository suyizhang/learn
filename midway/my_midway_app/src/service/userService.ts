import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserService {
  async getUser() {
    return 'world';
  }
}