
class helper {
    encodeURI(url: string): string {
        return encodeURI(url);
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