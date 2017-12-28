import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.post('/', controller.wechat.index);
    // router.post('/inskeeper', controller.inskeeper.index);
}