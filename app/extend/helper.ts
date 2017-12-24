
class helper {
    encodeURI(url: string): string {
        return encodeURI(url);
    }
    regxChinese(string: string): string {
        return string.match('[^0-9]+') + ''
    }
    regxNumber(string: string): string {
        const int = string.match(/\d+(\.\d+)/g);

        if (int === null) {
            return string.match(/\d+/g) + '';
        } else {
            return int + ''
        }
    }
    caculate(spec: string | undefined, weight: string): string {
        return Math.round((parseFloat(spec + '') / 100 * parseFloat(weight))) + ''
    }
    returnWechatMsg(toUser: string, msg: string) {

        return `<xml><ToUserName>${toUser}</ToUserName><FromUserName>gh_cb7321b27e37</FromUserName><CreateTime>${Date.now()}</CreateTime><MsgType>< ![CDATA[text] ]></MsgType><Content>< ![CDATA[${msg}] ]></Content></xml>`
    }
}

export default {
    utils: new helper
}

declare module 'egg' {
    export interface Context {
        helper: {
            utils: helper
        }
    }
}