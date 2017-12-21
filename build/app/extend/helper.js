"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class helper {
    encodeURI(url) {
        return encodeURI(url);
    }
    regxChinese(string) {
        return string.match('[\u4e00-\u9fa5]+') + '';
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
}
exports.default = {
    utils: new helper
};
