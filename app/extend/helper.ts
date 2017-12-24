
class helper {
    encodeURI(url: string): string {
        return encodeURI(url);
    }
    regxChinese(string: string): string {
        return string.match('[^0-9]+') + ''
    }
    regxNumber(string: string): string {
        let int = string.match(/\d+(\.\d+)/g);

        if (int === null) {
            int = string.match(/\d+/g);
            if (int === null) {
                return "100"
            }
            return string.match(/\d+/g) + '';
        }
        return '100'
    }
    caculate(spec: string | undefined, weight: string): string {
        return Math.round((parseFloat(spec + '') / 100 * parseFloat(weight))) + ''
    }
    returnWechatMsg(toUser: string, msg: string) {

        var xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA[" + 'gh_cb7321b27e37' + "]]></FromUserName>";
        xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA[" + msg + "]]></Content></xml>";
        return xmlContent
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