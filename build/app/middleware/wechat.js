"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmlparser = require("xml2json");
module.exports = (options) => {
    return async function wechat(ctx, next) {
        let awaitBody = new Promise(function (resolve, reject) {
            try {
                let buf = '';
                ctx.req.on('data', (chunk) => {
                    buf += chunk;
                });
                ctx.req.on('end', () => {
                    console.log(buf);
                    resolve(buf);
                });
            }
            catch (e) {
                reject(e);
            }
        });
        let result = await awaitBody;
        if (ctx.request.headers['content-type'] === 'text/xml') {
            let json = xmlparser.toJson(result);
            ctx.request.body = JSON.parse(json);
        }
        if (ctx.request.headers['content-type'] === 'application/json') {
            ctx.request.body = JSON.parse(result);
        }
        await next();
    };
};
