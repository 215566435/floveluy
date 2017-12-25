import { Service } from "egg";
import * as cheerio from 'cheerio';


const isShortCode = (string: string) => {
    const INS: { [string: string]: number } = {
        '': 1,
        'https:': 1,
        'instagram.com': 1,
        'p': 1,
        'www.instagram.com': 1
    }
    return INS[string];
}


export default class InskeeperService extends Service {
    constructor(props: any) {
        super(props);

    }
    async Curl(url: string) {
        return await this.ctx.curl(url, {
            dataType: 'text'
        });
    }
    isMutipleImage(json: any) {
        var url: string[] = [];
        json.entry_data.PostPage.forEach((el: any) => {
            el.graphql.shortcode_media.edge_sidecar_to_children.edges.forEach((ele: any) => {
                const node = ele.node;
                if (node.is_video === true) {
                    url.push(ele.node.video_url);
                } else {
                    url.push(ele.node.display_url);
                }
            })
        })
        return url;
    }
    ImageOrVideo(raw: Cheerio): string[] {
        var urlArray: string[] = [];
        raw.each((i, e) => {
            if (e.childNodes[0]) {
                const string: string = e.childNodes[0].data + '';
                if (string.startsWith('window._sharedData')) {
                    const json = string.substring(21, string.length - 1);
                    const parse = JSON.parse(json);
                    try {
                        urlArray = this.isMutipleImage(parse);
                    } catch (e) {
                        urlArray.push(parse.entry_data.PostPage[0].graphql.shortcode_media.display_url)
                    }
                }
            }
        })
        return urlArray
    }
    getShortCode(url: string) {
        const split = url.split('/')
        var shortCode = '';
        split.forEach((s) => {
            if (isShortCode(s) === void 666) {
                shortCode = s;
            }
        })
        return shortCode;
    }

    async fetchIns(url: string) {
        var shortCode = this.getShortCode(url);
        const ins = await this.Curl(`https://www.instagram.com/p/${shortCode}/`);
        const doc = cheerio.load(ins.data);
        const raw = doc('script[type="text/javascript"]');
        return this.ImageOrVideo(raw);
    }
}

declare module 'egg' {
    export interface IService {
        inskeeper: InskeeperService,
    }
}

