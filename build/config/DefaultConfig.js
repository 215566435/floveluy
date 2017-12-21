'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultConfig {
    constructor() {
        this.bohee = {
            FOOD_URL: 'http://www.boohee.com/',
            SEARCH_URL: 'http://www.boohee.com/food/search?keyword=',
        };
    }
}
exports.DefaultConfig = DefaultConfig;
;
exports.default = new DefaultConfig();
