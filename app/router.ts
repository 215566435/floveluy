import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.get('homepage', '/', controller.home.index);
}