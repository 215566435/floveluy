import { Service } from "egg";
import * as cheerio from 'cheerio';
// import * as sequelize from 'sequelize';

interface FoodSpec {
    title: string | undefined,
    carbs: string | undefined,
    fat: string | undefined,
    pro: string | undefined
}

export default class FoodService extends Service {
    constructor(props: any) {
        super(props);

    }

    getConfig() {
        return this.app.config;
    }
    getUtils() {
        return this.ctx.helper.utils
    }
    async getText(url: string) {
        return await this.ctx.curl(url, {
            dataType: 'text'
        });
    }

    async calulate(foods: string[]): Promise<FoodSpec> {
        const specs = await this.getFoodBundle(foods);
        var title = '';
        var totalCarbs = 0;
        var totalFats = 0;
        var totalPros = 0;

        specs.forEach((spec, index) => {
            const name = (spec.title + '').split('，')[0];
            title = title + ((index === 0 ? "" : "，") + name);
            totalCarbs = totalCarbs + parseFloat(spec.carbs + '');
            totalFats = totalFats + parseFloat(spec.fat + '')
            totalPros = totalPros + parseFloat(spec.pro + '')
        })
        return {
            title: title,
            carbs: totalCarbs + '',
            fat: totalFats + '',
            pro: totalPros + ''
        }
    }

    async getFoodBundle(foods: string[]): Promise<FoodSpec[]> {
        const calulateEach = async (food: string): Promise<FoodSpec> => {
            const name = this.ctx.helper.utils.regxChinese(food);
            const weight = this.ctx.helper.utils.regxNumber(food);
            const spec = await this.getFood(name + '');
            return {
                ...spec,
                carbs: (parseFloat(spec.carbs + '') / 100 * parseFloat(weight)).toFixed(1) + '',
                fat: (parseFloat(spec.fat + '') / 100 * parseFloat(weight)).toFixed(1) + '',
                pro: (parseFloat(spec.pro + '') / 100 * parseFloat(weight)).toFixed(1) + '',
            }
        }

        const promises = foods.map(calulateEach);
        const specs = await Promise.all(promises);
        return specs
    }

    async getFood(keyword: string): Promise<FoodSpec> {
        const htmlText = await this.getText(this.getConfig().bohee.SEARCH_URL + encodeURI(keyword))
        const doc = cheerio.load(htmlText.data);
        const parsedDoc = doc('div[class="text-box pull-left"]').find('h4').find('a');
        if (parsedDoc.length > 0) {
            this.app.logger.info(parsedDoc[0].attribs['title']);
            const title = parsedDoc[0].attribs['title'];
            const herf = parsedDoc[0].attribs['href'];
            const foodSpec = await this._getFood(herf);
            return { ...foodSpec, title: title };
        } else {
            return {
                title: '搜索的物品不太对头',
                carbs: '',
                fat: '',
                pro: ''
            };
        }
    }

    async _getFood(herf: string): Promise<FoodSpec> {
        const htmlText = await this.getText(this.getConfig().bohee.FOOD_URL + herf);
        const doc = cheerio.load(htmlText.data);
        const parsedDoc = doc('dl').find('span[class="dt"]');

        const foodSpec: FoodSpec = {
            title: '',
            carbs: '',
            fat: '',
            pro: ''
        };
        parsedDoc.each((index, ele) => {
            switch (ele.children[0].data) {
                case '碳水化合物(克)':
                    foodSpec.carbs = ele.nextSibling.children[0].data;
                    break;
                case '脂肪(克)':
                    foodSpec.fat = ele.nextSibling.children[0].data;
                    break;
                case '蛋白质(克)':
                    foodSpec.pro = ele.nextSibling.children[0].data;
                    break;
                default:
                    break;
            }
        })
        return foodSpec;
    }
}

declare module 'egg' {
    export interface IService {
        food: FoodService;
    }
}