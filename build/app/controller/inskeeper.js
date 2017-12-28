"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class InsKeeperController extends egg_1.Controller {
    async index() {
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
}
exports.default = InsKeeperController;
