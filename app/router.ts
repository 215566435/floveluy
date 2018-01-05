import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    router.resources('plan', '/trainnote/plan', controller.trainnote);
    router.get('/dev_init', controller.trainnote.dev_init);
}