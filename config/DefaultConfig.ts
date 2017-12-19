'use strict';
export class DefaultConfig {
  news = {
    pageSize: 30,
    serverUrl: 'http://www.boohee.com/food/search?keyword=%E8%8B%B9%E6%9E%9C',
  };
};

export default new DefaultConfig();

declare module 'egg' {
  export interface Application {
    config: EggAppConfig & DefaultConfig;
  }
}