"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const cheerio = require("cheerio");
class FoodService extends egg_1.Service {
    getConfig() {
        return this.app.config;
    }
    async getFood(keyword) {
        const html = await this.ctx.curl(this.getConfig().news.serverUrl + keyword, {
            dataType: 'text'
        });
        console.log(this.ctx.helper.foo());
        const doc = cheerio.load(html.data);
        const parsedDoc = doc('div[class="text-box pull-left"]').find('h4').find('a');
        if (parsedDoc.length > 0) {
            this.app.logger.info(parsedDoc[0].attribs['title']);
            return parsedDoc[0].attribs['title'];
        }
        else {
            return '没有找到该有的信息';
        }
    }
}
exports.default = FoodService;
