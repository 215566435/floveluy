'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultConfig {
    constructor() {
        this.bohee = {
            FOOD_URL: 'http://www.boohee.com/',
            SEARCH_URL: 'http://www.boohee.com/food/search?keyword=',
        };
        this.database = {
            database: 'trainnote',
            username: 'root',
            password: 'metal_gear2',
            host: 'localhost',
            port: '3306'
        };
    }
}
exports.DefaultConfig = DefaultConfig;
;
exports.default = new DefaultConfig();
