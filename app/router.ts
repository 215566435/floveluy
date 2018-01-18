import { Application } from "egg";
var route: any = {}


export const Http = {
    get: (url: string, controllerName: string) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            route[url] = { propertyKey, controllerName, method: 'get' }
        };
    },
    post: (url: string, controllerName: string) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            route[url] = { propertyKey, controllerName, method: 'post' }
        };
    },
    patch: (url: string, controllerName: string) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            route[url] = { propertyKey, controllerName, method: 'patch' }
        };
    },
    options: (url: string, controllerName: string) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            route[url] = { propertyKey, controllerName, method: 'options' }
        };
    },
    delete: (url: string, controllerName: string) => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            route[url] = { propertyKey, controllerName, method: 'delete' }
        };
    }
}

enum Methods {
    get = 'get',
    post = 'post',
    patch = 'patch',
    options = 'options',
    delete = 'delete'
}


export default (app: Application) => {

    const { router, controller } = app;
    Object.keys(route).forEach((key) => {
        const name = route[key].controllerName;
        const handler = route[key].propertyKey;
        const method: Methods = route[key].method;
        router[method](key, controller[name][handler]);
        console.log('mapping url-->', 'key', 'handler');
    })


    router.post('/', controller.wechat.index);
    // router.resources('plan', '/trainnote/plan', controller.plan);

    router.post('/trainnote/plan/days', controller.plan.addDay);

    router.get('/dev_init', controller.plan.dev_init);
    router.get('/dev_insert', controller.plan.tmp_insert);
}