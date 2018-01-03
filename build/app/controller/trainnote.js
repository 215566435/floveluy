"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class TrainNoteController extends egg_1.Controller {
    async plan() {
        const app = this.app;
        if (app.config.env === 'local') {
            // const plan: Model<{}, {}> = this.ctx.model.Plan;
            // const days: Model<{}, {}> = this.ctx.model.Days;
            // plan.hasMany(
            //     days,
            //     { foreignKey: 'planID', as: 'days' }
            // )
            // days.belongsTo(
            //     plan,
            //     { foreignKey: 'planID', as: 'plan' }
            // )
            // app.beforeStart(function* () {
            //     yield app.model.sync({ force: true });
            // });
        }
        // await this.tmp_insert();
        const plan = this.ctx.model.Plan;
        const days = this.ctx.model.Days;
        plan.hasMany(days, { foreignKey: 'planID' });
        days.belongsTo(plan, { foreignKey: 'planID' });
        const plandata = await plan.findOne({
            include: [{
                    model: days,
                    as: 'days'
                }]
        });
        if (plandata) {
            plandata['days'].forEach((day) => {
                console.log(day['title']);
            });
        }
        // const res: { [string: string]: any } = plandata[0];
        this.ctx.response.body = `你获得计划`;
    }
    async tmp_insert() {
        const plan = this.ctx.model.Plan;
        const days = this.ctx.model.Days;
        const now = await plan.count();
        await plan.create({
            title: '减脂捷径',
            sub_title: '快速、科学、有效的减脂计划',
            author: '方正',
            time: now,
            planID: now
        });
        await days.create({
            title: '胸肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: now
        });
    }
}
module.exports = TrainNoteController;
