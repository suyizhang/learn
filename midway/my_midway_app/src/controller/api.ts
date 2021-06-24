import { Inject, Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query() uid) {
    const user = await this.userService.getUser(1);
    return { success: true, message: 'OK', data: user };
  }
}
