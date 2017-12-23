"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (options) => {
    return async function wechat(ctx, next) {
        if (ctx.request.headers['content-type'] === 'text/xml') {
            let awaitBody = new Promise(function (resolve, reject) {
                try {
                    let buf = '';
                    ctx.req.on('data', (chunk) => {
                        buf += chunk;
                    });
                    ctx.req.on('end', () => {
                        console.log('解析完毕', buf);
                        resolve(buf);
                    });
                }
                catch (e) {
                    reject(e);
                }
            });
            let result = await awaitBody;
            console.log(result);
            // ctx.request.body = xmlparser.toJson(result);
        }
        await next();
    };
};
