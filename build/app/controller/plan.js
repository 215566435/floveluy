"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const basecontroller_1 = require("../base/basecontroller");
const router_1 = require("../router");
const NAME = 'plan';
class PlanController extends basecontroller_1.BaseController {
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
    async createExercise() {
        this.Success({
            good: '好!'
        });
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
    async create() {
        try {
            this.ctx.validate({
                title: { type: 'string' },
                sub_title: { type: 'string' },
                author: { type: 'string' }
            });
            const PlanModel = this.ctx.request.body;
            const res = await this.service.plan.createPlan(PlanModel);
            this.Success({
                id: res.id
            });
            //curl -H "Content-Type: application/json" -X POST --data '{"title":"1","sub_title":"123","author":"123"}' http://127.0.0.1:7001/trainnote/plan/
        }
        catch (e) {
            this.Fail(e);
        }
    }
    async addDay() {
        this.ctx.validate({
            day: { type: 'number' },
            title: { type: 'string' },
            bodypart: { type: 'number' },
            surface: { type: 'string' },
            planID: { type: 'number' }
        });
        const days_id = this.service.plan.addDays(this.ctx.request.body);
        //curl -H "Content-Type: application/json" -X POST --data '{"title":"某一天","day":1,"bodypart":123,"surface":"http://","planID":1}' http://127.0.0.1:7001/trainnote/plan/days
        this.Success({
            days_id
        });
    }
    async tmp_insert() {
        const plan = this.ctx.model.Plan;
        const days = this.ctx.model.Days;
        await plan.create({
            title: '方正的减脂捷径',
            sub_title: '快速、科学、有策略性的减脂攻略',
            author: '方正',
            time: Date.now(),
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
__decorate([
    router_1.Http.get('/createExercise', NAME)
], PlanController.prototype, "createExercise", null);
module.exports = PlanController;
