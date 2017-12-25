"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const cheerio = require("cheerio");
const isShortCode = (string) => {
    const INS = {
        '': 1,
        'https:': 1,
        'instagram.com': 1,
        'p': 1,
        'www.instagram.com': 1
    };
    return INS[string];
};
class InskeeperService extends egg_1.Service {
    constructor(props) {
        super(props);
    }
    async Curl(url) {
        return await this.ctx.curl(url, {
            dataType: 'text'
        });
    }
    isMutipleImage(json) {
        var url = [];
        json.entry_data.PostPage.forEach((el) => {
            el.graphql.shortcode_media.edge_sidecar_to_children.edges.forEach((ele) => {
                const node = ele.node;
                if (node.is_video === true) {
                    url.push(ele.node.video_url);
                }
                else {
                    url.push(ele.node.display_url);
                }
            });
        });
        return url;
    }
    ImageOrVideo(raw) {
        var urlArray = [];
        raw.each((i, e) => {
            if (e.childNodes[0]) {
                const string = e.childNodes[0].data + '';
                if (string.startsWith('window._sharedData')) {
                    const json = string.substring(21, string.length - 1);
                    const parse = JSON.parse(json);
                    try {
                        urlArray = this.isMutipleImage(parse);
                    }
                    catch (e) {
                        urlArray.push(parse.entry_data.PostPage[0].graphql.shortcode_media.display_url);
                    }
                }
            }
        });
        return urlArray;
    }
    getShortCode(url) {
        const split = url.split('/');
        var shortCode = '';
        split.forEach((s) => {
            if (isShortCode(s) === void 666) {
                shortCode = s;
            }
        });
        return shortCode;
    }
    async fetchIns(url) {
        var shortCode = this.getShortCode(url);
        const ins = await this.Curl(`https://www.instagram.com/p/${shortCode}/`);
        const doc = cheerio.load(ins.data);
        const raw = doc('script[type="text/javascript"]');
        return this.ImageOrVideo(raw);
    }
}
exports.default = InskeeperService;
