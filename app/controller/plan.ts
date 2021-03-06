import { Model } from 'sequelize';
import { BaseController } from '../base/basecontroller';
import { PlanModel, DayModel, ExerciseModel } from '../service/plan';
import { Http } from '../router';


const NAME = 'plan';


class PlanController extends BaseController {
    constructor(props: any) {
        super(props);
        console.log('初始化')
    }

    async dev_init() {
        const app = this.app;
        if (app.config.env === 'local') {
            const plan: Model<{}, {}> = this.ctx.model.Plan;
            const days: Model<{}, {}> = this.ctx.model.Days;

            plan.hasMany(
                days,
                { foreignKey: 'planID' }
            )

            app.beforeStart(function* () {
                yield app.model.sync({ force: true });
            });
        }
    }

    @Http.post('/createExercise', NAME)
    async createExercise() {

        await this.service.plan.createExercise(<ExerciseModel>this.ctx.request.body);
        this.Success({
            good: '好!'
        });
        //curl -H "Content-Type: application/json" -X POST --data '{"title":"腹肌训练动作2","description":"这个动作非常牛b","image":"http","plan_id":"1","daysID":1}' http://127.0.0.1:7001/createExercise
    }

    @Http.get('/getExcercise', NAME)
    async getExercise() {

        // const excercise = await this.service.plan.getExercise();

        // if (excercise) {
        //     const one = excercise;

        //     this.Success({
        //         data: one
        //     });
        // }
    }

    @Http.get('/plans', NAME)
    async index() {
        const plan = await this.service.plan.getPlan();

        if (plan) {
            this.Success(plan);
        } else {
            this.Fail('没有相应的计划');
        }
    }

    async create() {
        try {
            this.ctx.validate({
                title: { type: 'string' },
                sub_title: { type: 'string' },
                author: { type: 'string' }
            })

            const PlanModel = <PlanModel>this.ctx.request.body;
            const res = await this.service.plan.createPlan(PlanModel);
            this.Success({
                id: res.id
            });
            //curl -H "Content-Type: application/json" -X POST --data '{"title":"1","sub_title":"123","author":"123"}' http://127.0.0.1:7001/trainnote/plan/
        } catch (e) {
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
        })
        const days_id = this.service.plan.addDays(<DayModel>this.ctx.request.body);
        //curl -H "Content-Type: application/json" -X POST --data '{"title":"某一天","day":1,"bodypart":123,"surface":"http://","planID":1}' http://127.0.0.1:7001/trainnote/plan/days
        this.Success({
            days_id
        })
    }

    async tmp_insert() {
        const plan: Model<{}, {}> = this.ctx.model.Plan;
        const days: Model<{}, {}> = this.ctx.model.Days;

        await plan.create({
            title: '方正的减脂捷径',
            sub_title: '快速、科学、有策略性的减脂攻略',
            author: '方正',
            time: Date.now(),
        })

        await days.create({
            day: 1,
            title: '胸肌/二头/腹肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })
        await days.create({
            day: 2,
            title: '背部/三头/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })

        await days.create({
            day: 3,
            title: '大腿/肩膀/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })

        await days.create({
            day: 4,
            title: '胸肌/二头/腹肌',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })

        await days.create({
            day: 5,
            title: '背部/三头/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })

        await days.create({
            day: 6,
            title: '大腿/肩膀/小腿',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })
        await days.create({
            day: 7,
            title: '休息',
            bodypart: 1,
            surface: 'http',
            days_id: 123,
            planID: 1
        })
    }
}

declare module 'egg' {
    export interface IController {
        plan: PlanController;
        [key: string]: {
            [key: string]: any
        }
    }
}

module.exports = PlanController;