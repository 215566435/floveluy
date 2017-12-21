
class helper {
    encodeURI(url: string): string {
        return encodeURI(url);
    }
    regxChinese(string: string): string {
        return string.match('[\u4e00-\u9fa5]+') + ''
    }
    regxNumber(string: string): string {
        const int = string.match(/\d+(\.\d+)/g);

        if (int === null) {
            return string.match(/\d+/g) + '';
        } else {
            return int + ''
        }
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