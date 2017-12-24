"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        console.log(this.ctx.request.body.toString());
        console.log('运行了这里');
        const foodspec = await this.ctx.service.food.calulate(['苹果130', '香蕉130', '雪糕200', '蛋糕150']);
        this.ctx.body = `<h5>${foodspec.title}</h5>
        <p>${foodspec.cal}</p>
        <p>${foodspec.carbs}</p>
        <p>${foodspec.fat}</p>
        <p>${foodspec.pro}</p>
        注意：如果出现0g的数字，代表这种元素在此类物品里量太少，忽略不计`;
        this.ctx.set('Content-Type', 'text/html;charset=utf-8');
    }
}
module.exports = HomeController;
