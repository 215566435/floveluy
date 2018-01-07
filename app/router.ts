import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.plan);
    router.get('/dev_init', controller.plan.dev_init);
    router.get('/dev_insert', controller.plan.tmp_insert);
}