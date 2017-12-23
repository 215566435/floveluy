import { Context } from 'egg';


module.exports = (options: any) => {
    return async function wechat(ctx: Context, next: any) {
        if (ctx.request.headers['content-type'] === 'text/xml') {
            console.log(ctx.request.body);
        }
    }
}