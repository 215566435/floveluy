"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.trainnote);
    router.get('/dev_init', controller.trainnote.dev_init);
};
