import { Controller } from 'egg';


class HomeController extends Controller {
    async index() {
        const number = await this.ctx.service.foo.bar();
        this.ctx.body = `Hello world,I am using typescript ${number}`;
        this.ctx.set('Content-Type', 'text/html');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}



module.exports = HomeController;