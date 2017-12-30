import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    router.get('/trainnote', controller.trainnote.index);
}