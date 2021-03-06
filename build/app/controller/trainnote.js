"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basecontroller_1 = require("../base/basecontroller");
class TrainNoteController extends basecontroller_1.BaseController {
    async show() {
        //查询计划
        this.ctx.response.body = `你输入的地址是：${this.ctx.params['id']}`;
    }
    async dev_init() {
        const app = this.app;
        if (app.config.env === 'local') {
            const plan = this.ctx.model.Plan;
            const days = this.ctx.model.Days;
            plan.hasMany(days, { foreignKey: 'planID' });
            app.beforeStart(function* () {
                yield app.model.sync({ force: true });
            });
        }
    }
    async index() {
        const plan = await this.service.plan.getPlan();
        if (plan) {
            this.Success(plan);
        }
        else {
            this.Fail('没有相应的计划');
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
            planID: 25
        });
        await days.create({
            day: 1,
            title: '胸肌/二头/腹肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 2,
            title: '背部/三头/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 3,
            title: '大腿/肩膀/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 4,
            title: '胸肌/二头/腹肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 5,
            title: '背部/三头/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 6,
            title: '大腿/肩膀/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
        await days.create({
            day: 7,
            title: '休息',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        });
    }
}
module.exports = TrainNoteController;
