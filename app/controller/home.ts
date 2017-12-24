import { Controller } from 'egg';


class HomeController extends Controller {
    async index() {
        let xmlbody: { [key: string]: any } = this.ctx.request.body;
        let toUser = xmlbody['xml']['FromUserName'];
        let Content: string = xmlbody['xml']['Content'];

        const foodspec = await this.ctx.service.food.calulate(Content.split(","));
        const msg = `「${foodspec.title}」
        ${foodspec.cal}
        ${foodspec.carbs}
        ${foodspec.fat}
        ${foodspec.pro}\n
        注意：如果出现0g的数字，代表这种元素在此类物品里量太少，忽略不计`;


        this.ctx.body = this.ctx.helper.utils.returnWechatMsg(toUser, msg)
        console.log(this.ctx.body)
        this.ctx.set('Content-Type', 'text/xml');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}

module.exports = HomeController;