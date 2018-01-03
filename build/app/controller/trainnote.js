"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class TrainNoteController extends egg_1.Controller {
    async plan() {
        const app = this.app;
        // if (app.config.env === 'local') {
        //     app.beforeStart(function* () {
        //         yield app.model.sync({ force: true });
        //     });
        // }
        // const Food: Model<{}, {}> = this.ctx.model.Food;
        // await this.tmp_insert();
        const plan = this.ctx.model.Plan;
        const plandata = await plan.findAll();
        const res = plandata[0];
        this.ctx.response.body = `你获得计划${res['title']}`;
    }
    async tmp_insert() {
        const plan = this.ctx.model.Plan;
        const now = Date.now();
        await plan.create({
            id: now,
            title: '减脂捷径',
            sub_title: '快速、科学、有效的减脂计划',
            author: '方正',
            time: now,
            plan_id: now
        });
    }
}
module.exports = TrainNoteController;
