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
        const int = string.match(/\d+(\.\d+)/g);
        if (int === null) {
            return string.match(/\d+/g) + '';
        }
        else {
            return int + '';
        }
    }
    caculate(spec, weight) {
        return Math.round((parseFloat(spec + '') / 100 * parseFloat(weight))) + '';
    }
    returnWechatMsg(toUser, msg) {
        return `<xml> 
        <ToUserName>< ![CDATA[${toUser}] ]></ToUserName> 
        <FromUserName>< ![CDATA[gh_cb7321b27e37] ]></FromUserName> 
        <CreateTime>12345678</CreateTime> 
        <MsgType>< ![CDATA[text] ]></MsgType> 
        <Content>< ![CDATA[${msg}] ]></Content> 
        </xml>`;
    }
}
exports.default = {
    utils: new helper
};
