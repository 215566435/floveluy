
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