"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        const number = await this.ctx.service.foo.bar();
        this.ctx.body = `Hello world,I am using typescript ${number}`;
        this.ctx.set('Content-Type', 'text/html');
    }
}
module.exports = HomeController;
