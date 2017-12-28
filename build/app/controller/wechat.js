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
            await this.app.controller.inskeeper.index();
        }
        else {
            await this.app.controller.foolcal.index();
        }
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
