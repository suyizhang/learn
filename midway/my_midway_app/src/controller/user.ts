import { Controller, Provide, Get, Query, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {

  @Inject()
  userService: UserService;

  @Get('/')
  async getUser(@Query() uid) {
    const user = await this.userService.getUser(uid);
    return { success: true, message: 'OK', data: user }
  }
}
