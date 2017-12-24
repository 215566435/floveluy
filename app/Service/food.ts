import { Service } from "egg";
import * as cheerio from 'cheerio';
// import * as sequelize from 'sequelize';

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
        const isSingleOne = foods.length === 1 ? true : false;


        const specs = await this.getFoodBundle(foods);
        var title = '';
        var totalCarbs = 0;
        var totalFats = 0;
        var totalPros = 0;
        var totalCal = 0;

        specs.forEach((spec, index) => {
            const name = (spec.title + '').split('，')[0];
            title = title + ((index === 0 ? "" : "，") + name + spec.weight + 'g');
            totalCarbs = totalCarbs + parseFloat(spec.carbs + '');
            totalFats = totalFats + parseFloat(spec.fat + '');
            totalPros = totalPros + parseFloat(spec.pro + '');
            totalCal = totalCal + parseFloat(spec.cal + '');
        })
        return {
            title: title,
            carbs: '碳水化合物：' + totalCarbs + 'g',
            fat: '脂肪：' + totalFats + 'g',
            pro: '蛋白质：' + totalPros + 'g',
            cal: '总热量：' + totalCal + '大卡',
            single: isSingleOne,
            notfound: specs[0].notfound
        }
    }

    async getFoodBundle(foods: string[]): Promise<FoodSpec[]> {
        const calulateEach = async (food: string): Promise<FoodSpec> => {
            const name = this.ctx.helper.utils.regxChinese(food);
            const weight = this.ctx.helper.utils.regxNumber(food);
            const spec = await this.getSingleFood(name + '');
            return {
                title: spec.title,
                carbs: this.ctx.helper.utils.caculate(spec.carbs, weight),
                fat: this.ctx.helper.utils.caculate(spec.fat, weight),
                pro: this.ctx.helper.utils.caculate(spec.pro, weight),
                cal: this.ctx.helper.utils.caculate(spec.cal, weight),
                weight: weight
            }
        }

        const promises = foods.map(calulateEach);
        const specs = await Promise.all(promises);
        return specs
    }

    async getSingleFood(keyword: string): Promise<FoodSpec> {
        const res = await this.ctx.service.database.checkfood(keyword);
        if (res) {
            return res
        }
        const htmlText = await this.getText(this.getConfig().bohee.SEARCH_URL + encodeURI(keyword))
        const doc = cheerio.load(htmlText.data);
        const parsedDoc = doc('div[class="text-box pull-left"]').find('h4').find('a');

        if (parsedDoc.length > 0) {
            this.app.logger.info(parsedDoc[0].attribs['title']);
            const title = parsedDoc[0].attribs['title'];
            const herf = parsedDoc[0].attribs['href'];
            const foodSpec = await this._getFood(herf);
            await this.ctx.service.database.temp_insert({ ...foodSpec, title: title }, keyword);

            return { ...foodSpec, title: title };
        }

        return {
            title: `我不认识**${keyword}**是啥`,
            carbs: '0',
            fat: '0',
            pro: '0',
            cal: '0',
            notfound: true
        };
    }

    async _getFood(herf: string): Promise<FoodSpec> {
        const htmlText = await this.getText(this.getConfig().bohee.FOOD_URL + herf);
        const doc = cheerio.load(htmlText.data);
        const parsedDoc = doc('dl').find('span[class="dt"]');

        const foodSpec: FoodSpec = {
            title: '',
            carbs: '',
            fat: '',
            pro: '',
            cal: ''
        };
        parsedDoc.each((index, ele) => {
            switch (ele.children[0].data) {
                case '热量(大卡)':
                    foodSpec.cal = ele.nextSibling.children[0].children[0].data;
                    break;
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

