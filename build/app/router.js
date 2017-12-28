"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    // router.post('/inskeeper', controller.inskeeper.index);
};
