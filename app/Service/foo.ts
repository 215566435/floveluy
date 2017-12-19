import { Service } from "egg";
import * as cheerio from 'cheerio';

class FooService extends Service {
    getConfig() {
        return this.app.config;
    }

    async bar() {
        const html = await this.ctx.curl(this.getConfig().news.serverUrl, {
            dataType: 'text'
        })
        const doc = cheerio.load(html.data)
        doc('div[class="text-box pull-left"]').find('h4').find('a').each((index, ele) => {
            console.log(ele.attribs['href']);
            console.log(ele.attribs['title']);
        });


        return html.data
    }
}

declare module 'egg' {
    export interface IService {
        foo: FooService;
    }
}

module.exports = FooService;