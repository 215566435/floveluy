'use strict';
export class DefaultConfig {
  bohee = {
    FOOD_URL: 'http://www.boohee.com/',
    SEARCH_URL: 'http://www.boohee.com/food/search?keyword=',
  };
};

export default new DefaultConfig();

declare module 'egg' {
  export interface Application {
    config: EggAppConfig & DefaultConfig;
  }
}