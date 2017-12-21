'use strict';
export class DefaultConfig {
  bohee = {
    FOOD_URL: 'http://www.boohee.com/',
    SEARCH_URL: 'http://www.boohee.com/food/search?keyword=',
  };
  database = {
    database: 'trainnote',
    username: 'root',
    password: 'metal_gear2',
    host: 'localhost',
    port: '3306'
  };
};

export default new DefaultConfig();

declare module 'egg' {
  export interface Application {
    config: EggAppConfig & DefaultConfig;
  }
}