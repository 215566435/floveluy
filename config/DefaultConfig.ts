'use strict';
export class DefaultConfig {
  news = {
    pageSize: 30,
    serverUrl: 'http://www.boohee.com/food/search?keyword=',
  };
};

export default new DefaultConfig();

declare module 'egg' {
  export interface Application {
    config: EggAppConfig & DefaultConfig;
  }
}