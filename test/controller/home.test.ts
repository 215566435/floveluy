'use strict';
// import * as assert from 'assert';
import * as cheerio from 'cheerio';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/home.test.js', () => {

  // const app = mm.app();
  // before(async () => {
  //   await app.ready();
  // });
  // after(() => app.close());

  it('should GET /', async () => {

    const res = await app.httpRequest().get('/').expect(200);
    // console.log(res)

    // const $ = cheerio.load(result.text);
    // const listItem = $('.news-view .item');
    // assert(listItem.length === app.config.news.pageSize);
  });

});
