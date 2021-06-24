import { App, Inject, Controller, Get, Provide } from '@midwayjs/decorator';
import { Context, Application } from 'egg';

@Provide()
@Controller('/', { middleware: ['reportMiddleware'] })
export class HomeController {

  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/', { middleware: [ 'reportMiddleware' ]})
  async home() {
    // this.ctx.query
    // const data = await this.app.curl('/api/data.json');
    return {
      data: 112
    };
  }

  @Get('/suyi')
  async suyi() {
    return 'suyi';
  }
}
