"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
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
        return await plan.count();
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
                return {
                    title: day['title'],
                    day: day['day'],
                    bodypart: day['bodypart'],
                    surface: day['surface'],
                    planID: day['planID']
                };
            });
        }
        return null;
    }
}
exports.default = PlanService;
