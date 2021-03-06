import { Controller } from 'egg';

enum MessageType {
    CHECK_CAL = 1,
    INS
}
interface WechatMessageInfo {
    toUser: string,
    Content: string
}

class WechatController extends Controller {
    async index() {
        if (this.getMessageType() === MessageType.INS) {
            await this.inskeeper();
        } else {
            await this.food();
        }
    }

    async food() {
        try {
            const info = this.postInfo();
            const foodspec = await this.ctx.service.food.calulate(info.Content.split(" "));

            if (foodspec.single === true && foodspec.notfound === true) {
                const joke = this.ctx.helper.utils.getJokerMsg(info.Content);
                this.ctx.body = this.ctx.helper.utils.returnWechatMsg(info.toUser, joke);
            } else {
                const msg = `「${foodspec.title}」\n${foodspec.cal}\n${foodspec.carbs}\n${foodspec.fat}\n${foodspec.pro}`;
                this.ctx.body = this.ctx.helper.utils.returnWechatMsg(info.toUser, msg);
            }
            this.ctx.set('Content-Type', 'text/plain; charset=utf-8');
        } catch (e) {
            this.app.logger.error(e);
        }
    }

    async inskeeper() {
        const info = this.postInfo();

        const urls = await this.ctx.service.inskeeper.fetchIns(info.Content);
        const urlBundles = urls.reduce((pre, next, index) => {
            if (index === 1) {
                return `<img src="${pre}"/>` + `<img src="${next}"/>`
            } else {
                return pre + `<img src="${next}"/>`
            }
        });
        this.ctx.body = this.ctx.helper.utils.returnWechatMsg(info.toUser, urlBundles);

        this.ctx.set('Content-Type', 'text/html; charset=utf-8');
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
            if (INS[split[i]] === 1) {
                return MessageType.INS;
            }
        }
        return MessageType.CHECK_CAL;
    }

    postInfo(): WechatMessageInfo {
        const xmlbody: { [key: string]: any } = this.ctx.request.body;
        const toUser = xmlbody['xml']['FromUserName'];
        const Content: string = xmlbody['xml']['Content'];
        return {
            toUser,
            Content
        }
    }
}

declare module 'egg' {
    export interface IController {
        wechat: WechatController;
    }
}

module.exports = WechatController;