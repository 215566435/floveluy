"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class PlanService extends egg_1.Service {
    constructor(props) {
        super(props);
    }
    getModel() {
        const plan = this.ctx.model.Plan;
        return plan;
    }
}
exports.default = PlanService;
