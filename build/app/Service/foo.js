"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const cheerio = require("cheerio");
class FoodService extends egg_1.Service {
    getConfig() {
        return this.app.config;
    }
    async getFood() {
        const html = await this.ctx.curl(this.getConfig().news.serverUrl, {
            dataType: 'text'
        });
        const doc = cheerio.load(html.data);
        doc('div[class="text-box pull-left"]').find('h4').find('a').each((index, ele) => {
            console.log(ele.attribs['href']);
            console.log(ele.attribs['title']);
        });
        return html.data;
    }
}
exports.default = FoodService;
