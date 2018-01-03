import { Controller } from 'egg';
import { Model } from 'sequelize';

class TrainNoteController extends Controller {
    async plan() {
        const app = this.app;
        // if (app.config.env === 'local') {
        //     app.beforeStart(function* () {
        //         yield app.model.sync({ force: true });
        //     });
        // }
        // const Food: Model<{}, {}> = this.ctx.model.Food;
        // await this.tmp_insert();
        const plan: Model<{}, {}> = this.ctx.model.Plan;
        const plandata = await plan.findAll();
        const res: { [string: string]: any } = plandata[0];

        this.ctx.response.body = `你获得计划${res['title']}`;

    }
    async tmp_insert() {
        const plan: Model<{}, {}> = this.ctx.model.Plan;
        const now = Date.now();

        await plan.create({
            id: now,
            title: '减脂捷径',
            sub_title: '快速、科学、有效的减脂计划',
            author: '方正',
            time: now,
            plan_id: now
        })

    }


}

declare module 'egg' {
    export interface IController {
        trainnote: TrainNoteController;
    }
}

module.exports = TrainNoteController;