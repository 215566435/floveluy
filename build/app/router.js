"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var route = {};
exports.Routers = {
    get: (url, controllerName) => {
        return function (target, propertyKey, descriptor) {
            route[url] = { propertyKey, controllerName, method: 'get' };
        };
    },
    post: (url, controllerName) => {
        return function (target, propertyKey, descriptor) {
            route[url] = { propertyKey, controllerName, method: 'post' };
        };
    },
    patch: (url, controllerName) => {
        return function (target, propertyKey, descriptor) {
            route[url] = { propertyKey, controllerName, method: 'patch' };
        };
    },
    options: (url, controllerName) => {
        return function (target, propertyKey, descriptor) {
            route[url] = { propertyKey, controllerName, method: 'options' };
        };
    },
    delete: (url, controllerName) => {
        return function (target, propertyKey, descriptor) {
            route[url] = { propertyKey, controllerName, method: 'delete' };
        };
    }
};
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["patch"] = "patch";
    Methods["options"] = "options";
    Methods["delete"] = "delete";
})(Methods || (Methods = {}));
exports.default = (app) => {
    const { router, controller } = app;
    Object.keys(route).forEach((key) => {
        const name = route[key].controllerName;
        const handler = route[key].propertyKey;
        const method = route[key].method;
        router[method](key, controller[name][handler]);
    });
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.plan);
    router.post('/trainnote/plan/days', controller.plan.addDay);
    router.get('/dev_init', controller.plan.dev_init);
    router.get('/dev_insert', controller.plan.tmp_insert);
};
