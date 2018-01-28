import { Controller } from 'egg';

export class BaseController extends Controller {
    constructor(props: any) {
        super(props);
    }

    /**
     * 返回正确结果
     * @param object 
     */
    Success(object: { [key: string]: any }) {

        const Success = {
            Success: true,
            message: 'Success',
            payload: { ...object }
        }
        this.ctx.response.body = JSON.stringify(Success);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        })
    }

    Fail(message: string) {
        const Fail = {
            Success: false,
            message: message 
        }

        this.ctx.response.body =  JSON.stringify(Fail);
        this.ctx.set({
            'Content-Type': 'application/json;charset=utf-8'
        })
    }

}