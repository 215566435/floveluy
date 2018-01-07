"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class BaseController extends egg_1.Controller {
    constructor(props) {
        super(props);
    }
    Success(object) {
        const Success = {
            Success: true,
            message: 'Success',
            payload: Object.assign({}, object)
        };
        this.ctx.response.body = JSON.stringify(Success);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        });
    }
    Fail(message) {
        const Fail = {
            Success: false,
            message: message
        };
        this.ctx.response.body = JSON.stringify(Fail);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        });
    }
}
exports.BaseController = BaseController;
