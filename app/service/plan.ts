import { Service } from "egg";
import * as cheerio from 'cheerio';
import { Model } from 'sequelize';

export interface PlanModel {
    title: string
    sub_title: string
    author: string
    Id?: number,
    days?: DayModel[] | null,
}

export interface DayModel {
    title: string
    day: number,
    bodypart: number,
    surface: string,
    planID: number
}

var DATE_UNIQUE_ID = Date.now();

export default class PlanService extends Service {
    constructor(props: any) {
        super(props);
    }
    async createPlan(postPlan: PlanModel): Promise<{ id: number }> {
        const plan: Model<{}, {}> = this.ctx.model.Plan;

        await plan.create({
            title: postPlan.title,
            sub_title: postPlan.sub_title,
            author: postPlan.author,
            time: Date.now(),
        })
        const id = await plan.count();

        return {
            id: id
        }
    }

    async addDays(DayModel: DayModel): Promise<number> {
        const days: Model<{}, {}> = this.ctx.model.Days;
        const days_id = DATE_UNIQUE_ID + DayModel.day + DayModel.planID;

        await days.create({
            day: DayModel.day,
            title: DayModel.title,
            bodypart: DayModel.bodypart,
            surface: DayModel.surface,
            days_id: days_id,
            planID: DayModel.planID
        })
        return days_id;
    }

    async getPlan(): Promise<PlanModel | null> {
        const plan: Model<{}, {}> = this.ctx.model.Plan;
        const days: Model<{}, {}> = this.ctx.model.Days;

        plan.hasMany(
            days,
            { foreignKey: 'planID' }
        )
        days.belongsTo(
            plan,
            { foreignKey: 'planID' }
        )

        const planData: { [string: string]: any } | null = await plan.findOne({
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
            }
        }
        return null;
    }

    parseDays(days: { [string: string]: any }[] | null): DayModel[] | null {
        if (days) {
            return days.map((day: { [string: string]: any }) => {
                return {
                    title: day['title'],
                    day: day['day'],
                    bodypart: day['bodypart'],
                    surface: day['surface'],
                    planID: day['planID']
                }
            })
        }
        return null;
    }

}

declare module 'egg' {
    export interface IService {
        plan: PlanService,
    }
}

