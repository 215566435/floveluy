"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class TrainNoteController extends egg_1.Controller {
    async show() {
        //查询计划
        // console.log(this.ctx.params['id'])
        this.ctx.response.body = `你输入的地址是：${this.ctx.params['id']}`;
    }
    async dev_init() {
        const app = this.app;
        if (app.config.env === 'local') {
            const plan = this.ctx.model.Plan;
            const days = this.ctx.model.Days;
            plan.hasMany(days, { foreignKey: 'planID', as: 'days' });
            days.belongsTo(plan, { foreignKey: 'planID', as: 'plan' });
            app.beforeStart(function* () {
                yield app.model.sync({ force: true });
            });
        }
    }
    async index() {
        // await this.tmp_insert();
        const plan = await this.service.plan.getPlan();
        // const res: { [string: string]: any } = plandata[0];
        if (plan) {
            this.ctx.response.body = `你获得计划\n${plan.title}\n${plan.sub_title}\n${plan.author}`;
        }
        else {
            this.ctx.response.body = `没有这个计划`;
        }
    }
    async tmp_insert() {
        const plan = this.ctx.model.Plan;
        const days = this.ctx.model.Days;
        const now = await plan.count();
        await plan.create({
            title: '方正的减脂捷径',
            sub_title: '快速、科学、有策略性的减脂攻略',
            author: '方正',
            time: Date.now(),
            planID: now + 1
        });
        await days.create({
            day: 1,
            title: '胸肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: now + 1
        });
    }
}
module.exports = TrainNoteController;
