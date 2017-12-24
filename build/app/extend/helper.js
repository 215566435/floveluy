"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class helper {
    encodeURI(url) {
        return encodeURI(url);
    }
    regxChinese(string) {
        return string.match('[^0-9]+') + '';
    }
    regxNumber(string) {
        let int = string.match(/\d+(\.\d+)/g);
        if (int === null) {
            int = string.match(/\d+/g);
            if (int === null) {
                return "100";
            }
            return string.match(/\d+/g) + '';
        }
        return '100';
    }
    caculate(spec, weight) {
        return Math.round((parseFloat(spec + '') / 100 * parseFloat(weight))) + '';
    }
    returnWechatMsg(toUser, msg) {
        var xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA[" + 'gh_cb7321b27e37' + "]]></FromUserName>";
        xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA[" + msg + "]]></Content></xml>";
        return xmlContent;
    }
    getJokerMsg(string) {
        const rand = Math.round((Math.random() * 10)) % 5;
        const joker = [
            `${string}是什么呀，可以吃吗？`,
            `不要拿${string}来逗我呀！`,
            `${string}?是不是什么羞羞的东西?`,
            `${string}不要再拿这个来逗我了！它不能吃，对吧？`,
            `嘻嘻,我不知道什么是${string}噢，你是不是打错字啦？`
        ];
        return joker[rand];
    }
}
exports.default = {
    utils: new helper
};
