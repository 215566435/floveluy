'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultConfig {
    constructor() {
        this.news = {
            pageSize: 30,
            serverUrl: 'http://www.boohee.com/food/search?keyword=%E8%8B%B9%E6%9E%9C',
        };
    }
}
exports.DefaultConfig = DefaultConfig;
;
exports.default = new DefaultConfig();
