"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["CHECK_CAL"] = 1] = "CHECK_CAL";
    MessageType[MessageType["INS"] = 2] = "INS";
})(MessageType || (MessageType = {}));
class WechatController extends egg_1.Controller {
    async index() {
        if (this.getMessageType() === MessageType.INS) {
            await this.food();
        }
        else {
            await this.inskeeper();
        }
    }
    async food() {
        let xmlbody = this.ctx.request.body;
        let toUser = xmlbody['xml']['FromUserName'];
        let Content = xmlbody['xml']['Content'];
        const foodspec = await this.ctx.service.food.calulate(Content.split(" "));
        if (foodspec.single === true && foodspec.notfound === true) {
            const joke = this.ctx.helper.utils.getJokerMsg(Content);
            this.ctx.body = this.ctx.helper.utils.returnWechatMsg(toUser, joke);
        }
        else {
            const msg = `「${foodspec.title}」\n${foodspec.cal}\n${foodspec.carbs}\n${foodspec.fat}\n${foodspec.pro}`;
            this.ctx.body = this.ctx.helper.utils.returnWechatMsg(toUser, msg);
        }
        this.ctx.set('Content-Type', 'text/plain; charset=utf-8');
    }
    async inskeeper() {
        let xmlbody = this.ctx.request.body;
        let toUser = xmlbody['xml']['FromUserName'];
        let Content = xmlbody['xml']['Content'];
        const urls = await this.ctx.service.inskeeper.fetchIns(Content);
        const urlBundles = urls.reduce((pre, next, index) => {
            if (index === 1) {
                return `<img src="${pre}"/>` + `<img src="${next}"/>`;
            }
            else {
                return pre + `<img src="${next}"/>`;
            }
        });
        this.ctx.body = this.ctx.helper.utils.returnWechatMsg(toUser, urlBundles);
        this.ctx.set('Content-Type', 'text/html; charset=utf-8');
    }
    getMessageType() {
        const INS = {
            '': 1,
            'https:': 1,
            'instagram.com': 1,
            'p': 1,
            'www.instagram.com': 1
        };
        var xmlbody = this.ctx.request.body;
        var Content = xmlbody['xml']['Content'];
        const split = Content.split('/');
        for (let i in split) {
            if (INS[split[i]]) {
                return MessageType.INS;
            }
        }
        return MessageType.CHECK_CAL;
    }
}
module.exports = WechatController;
