import { Controller } from 'egg';


class HomeController extends Controller {
    async index() {
        let xmlbody: { [key: string]: any } = this.ctx.request.body;
        let toUser = xmlbody['xml']['FromUserName'];
        let Content: string = xmlbody['xml']['Content'];

        const foodspec = await this.ctx.service.food.calulate(Content.split(" "));
        if (foodspec.single === true && foodspec.notfound === true) {
            this.ctx.body = this.ctx.helper.utils.getJokerMsg(Content);
        } else {
            const msg = `「${foodspec.title}」\n${foodspec.cal}\n${foodspec.carbs}\n${foodspec.fat}\n${foodspec.pro}\n\n注意：如果出现0g的数字，代表这种元素在此类物品里量太少，忽略不计`;
            this.ctx.body = this.ctx.helper.utils.returnWechatMsg(toUser, msg)
        }

        this.ctx.set('Content-Type', 'text/plain; charset=utf-8');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}

module.exports = HomeController;