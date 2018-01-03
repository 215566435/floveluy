import { Service } from "egg";
import * as cheerio from 'cheerio';
import { Model } from 'sequelize';

export interface FoodSpec {
    title: string | undefined,
    carbs: string | undefined,
    fat: string | undefined,
    pro: string | undefined,
    cal: string | undefined,
    weight?: string | undefined,
    notfound?: boolean,
    single?: boolean
}

export default class PlanService extends Service {
    constructor(props: any) {
        super(props);

    }
    getModel(): Model<{}, {}> {
        const plan: Model<{}, {}> = this.ctx.model.Plan;
        return plan;
    }
    
}

declare module 'egg' {
    export interface IService {
        plan: PlanService,
    }
}

