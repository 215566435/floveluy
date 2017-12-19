import { Application } from "egg";

module.exports = (app: Application) => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
}