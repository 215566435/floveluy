import { Controller } from 'egg';

enum MessageType {
    CHECK_CAL = 1,
    INS
}

class WechatController extends Controller {
    async index() {
        if (this.getMessageType() === MessageType.INS) {
            await this.app.controller.inskeeper.index();
        } else {
            await this.app.controller.foolcal.index();
        }
    }

    getMessageType(): MessageType {
        const INS: { [string: string]: number } = {
            '': 1,
            'https:': 1,
            'instagram.com': 1,
            'p': 1,
            'www.instagram.com': 1
        }
        var xmlbody: { [key: string]: any } = this.ctx.request.body;
        var Content: string = xmlbody['xml']['Content'];
        const split = Content.split('/');
        for (let i in split) {
            if (INS[split[i]]) {
                return MessageType.INS;
            }
        }
        return MessageType.CHECK_CAL;
    }
}

declare module 'egg' {
    export interface IController {
        wechat: WechatController;
    }
}

module.exports = WechatController;