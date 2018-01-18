"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var DATE_UNIQUE_ID = Date.now();
class PlanService extends egg_1.Service {
    constructor(props) {
        super(props);
    }
    async createPlan(postPlan) {
        const plan = this.ctx.model.Plan;
        await plan.create({
            title: postPlan.title,
            sub_title: postPlan.sub_title,
            author: postPlan.author,
            time: Date.now(),
        });
        const id = await plan.count();
        return {
            id: id
        };
    }
    async createExercise(exerciseModel) {
        const exercise = this.ctx.model.Exercise;
        await exercise.create(exerciseModel);
    }
    async getExercise(plan_id, daysID) {
        const exercise = this.ctx.model.Exercise;
        const planData = await exercise.findOne({
            where: {
                plan_id: 1,
                daysID: 1
            }
        });
        return planData;
    }
    async addDays(DayModel) {
        const days = this.ctx.model.Days;
        const days_id = DATE_UNIQUE_ID + DayModel.day + DayModel.planID;
        await days.create({
            day: DayModel.day,
            title: DayModel.title,
            bodypart: DayModel.bodypart,
            surface: DayModel.surface,
            days_id: days_id,
            planID: DayModel.planID
        });
        return days_id;
    }
    async getPlan() {
        const plan = this.ctx.model.Plan;
        const days = this.ctx.model.Days;
        plan.hasMany(days, { foreignKey: 'planID' });
        days.belongsTo(plan, { foreignKey: 'planID' });
        const planData = await plan.findOne({
            include: [{
                    model: days,
                    as: 'days'
                }]
        });
        if (planData) {
            const days = this.parseDays(planData['days']);
            return {
                title: planData['title'],
                sub_title: planData['sub_title'],
                author: planData['author'],
                Id: planData['id'],
                days: days
            };
        }
        return null;
    }
    parseDays(days) {
        if (days) {
            return days.map((day) => {
                return day;
            });
        }
        return null;
    }
}
exports.default = PlanService;
