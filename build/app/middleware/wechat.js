"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (options) => {
    return async function wechat(ctx, next) {
        if (ctx.request.headers['content-type'] === 'text/xml') {
            console.log(ctx.request.body);
        }
        await next();
    };
};
