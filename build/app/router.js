"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
};
