import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.post('homepage', '/', controller.foolcal.index);
    router.get('/inskeeper', controller.inskeeper.index);
}