import { Application } from "egg";

const route: any = {

}

export function get(url: string, controllerName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log({ target, propertyKey, descriptor });

        route[url] = { propertyKey, controllerName }
    };
}



export default (app: Application) => {

    const { router, controller } = app;
    Object.keys(route).forEach((key) => {
        const name = route['/abc'].controllerName;
        const method = route['/abc'].propertyKey;
        router.get('/abc', controller[name][method]);
    })
    const name = route['/abc'].controllerName;
    const method = route['/abc'].propertyKey;
    console.log(route['/abc'])

    router.get('/abc', controller[name][method]);
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.plan);

    router.post('/trainnote/plan/days', controller.plan.addDay);

    router.get('/dev_init', controller.plan.dev_init);
    router.get('/dev_insert', controller.plan.tmp_insert);
}