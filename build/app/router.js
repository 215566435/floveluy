"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route = {};
function get(url, controllerName) {
    return function (target, propertyKey, descriptor) {
        console.log({ target, propertyKey, descriptor });
        route[url] = { propertyKey, controllerName };
    };
}
exports.get = get;
exports.default = (app) => {
    const { router, controller } = app;
    const name = route['/abc'].controllerName;
    const method = route['/abc'].propertyKey;
    console.log(route['/abc']);
    Object.getOwnPropertyDescriptor;
    router.get('/abc', controller[name][method]);
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.plan);
    router.post('/trainnote/plan/days', controller.plan.addDay);
    router.get('/dev_init', controller.plan.dev_init);
    router.get('/dev_insert', controller.plan.tmp_insert);
};
