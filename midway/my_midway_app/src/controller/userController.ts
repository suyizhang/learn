import { Provide, Inject, Get, Controller } from '@midwayjs/decorator';
import { UserService } from '../service/userService';

@Provide()
@Controller('/')
export class UserController {
  
  @Inject()
  userService: UserService;

  @Get('/')
  async get() {
    const user = await this.userService.getUser();
    console.log(user);      // world
  }
}


