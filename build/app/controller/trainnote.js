"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class TrainNoteController extends egg_1.Controller {
    async index() {
        const app = this.app;
        // if (app.config.env === 'local') {
        //     app.beforeStart(function* () {
        //         yield app.model.sync({ force: true });
        //     });
        // }
        const Food = this.ctx.model.Food;
    }
}
module.exports = TrainNoteController;
