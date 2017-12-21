import { Controller } from 'egg';


class HomeController extends Controller {
    async index() {
        const foodspec = await this.ctx.service.food.calulate(['苹果100.2', '橘子100', '米线100']);

        this.ctx.body = `<h5>${foodspec.title}</h5>
        <p>${foodspec.carbs}</p>
        <p>${foodspec.fat}</p>
        <p>${foodspec.pro}</p>`;

        this.ctx.set('Content-Type', 'text/html;charset=utf-8');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}

module.exports = HomeController;