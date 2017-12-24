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
}
exports.default = {
    utils: new helper
};
