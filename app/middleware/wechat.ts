import { Context } from 'egg';
import * as xmlparser from 'xml2json';


module.exports = (options: any) => {
    return async function wechat(ctx: Context, next: any) {
        let awaitBody = new Promise(function (resolve, reject) {
            try {
                let buf = ''
                ctx.req.on('data', (chunk) => {
                    buf += chunk
                })
                ctx.req.on('end', () => {
                    console.log(buf);
                    resolve(buf);
                })
            } catch (e) {
                reject(e);
            }
        })
        let result: any = await awaitBody;

        if (ctx.request.headers['content-type'] === 'text/xml') {
            let json = xmlparser.toJson(result)
            ctx.request.body = JSON.parse(json);
        }
        if (ctx.request.headers['content-type'] === 'application/json') {
            ctx.request.body = JSON.parse(result);
        }

        await next();
    }

}