import { Service } from "egg";
import * as cheerio from 'cheerio';
import { Model } from 'sequelize';

export interface PlanModel {
    title: string
    sub_title: string
    author: string
    planID: number,
    days: DayModel[] | null
}

export interface DayModel {
    title: string
    day: number,
    bodypart: number,
    surface: string,
    planID: number
}

export default class PlanService extends Service {
    constructor(props: any) {
        super(props);

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
            const days = this.getDays(planData['days']);
            console.log(days)
            return {
                title: planData['title'],
                sub_title: planData['sub_title'],
                author: planData['author'],
                planID: planData['planID'],
                days: days
            }
        }
        return null;
    }

    getDays(days: { [string: string]: any }[] | null): DayModel[] | null {
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

