import { Controller } from 'egg';
import { Model } from 'sequelize';

class TrainNoteController extends Controller {
    async index() {
        const app = this.app;
        // if (app.config.env === 'local') {
        //     app.beforeStart(function* () {
        //         yield app.model.sync({ force: true });
        //     });
        // }
        const Food: Model<{}, {}> = this.ctx.model.Food;
    }

}

declare module 'egg' {
    export interface IController {
        trainnote: TrainNoteController;
    }
}

module.exports = TrainNoteController;