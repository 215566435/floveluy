'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultConfig {
    constructor() {
        this.news = {
            pageSize: 30,
            serverUrl: 'http://www.boohee.com/food/search?keyword=',
        };
    }
}
exports.DefaultConfig = DefaultConfig;
;
exports.default = new DefaultConfig();
