"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const egg_1 = require("egg");
var instance = undefined;
class DatabaseService extends egg_1.Service {
    constructor(props) {
        super(props);
        if (!instance) {
            console.log('调用');
            instance = this;
        }
        return instance;
    }
    getConfig() {
        return this.app.config.database;
    }
    init() {
        if (!this.sequelize) {
            console.log('初始化');
            this.sequelize = new Sequelize(this.getConfig().database, this.getConfig().username, this.getConfig().password, {
                host: this.getConfig().host,
                dialect: 'mysql',
                operatorsAliases: false,
                dialectOptions: {
                    charset: "utf8mb4",
                    collate: "utf8mb4_unicode_ci",
                    supportBigNumbers: true,
                    bigNumberStrings: true
                },
                define: {
                    'underscored': true,
                    charset: 'utf8mb4'
                },
                pool: {
                    max: 5,
                    min: 0,
                    idle: 30000
                }
            });
        }
    }
    async temp_makeTable() {
        this.init();
        return this.sequelize.define('food', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true
            },
            sname: Sequelize.STRING(20),
            fullname: Sequelize.STRING(40),
            cal: Sequelize.DOUBLE,
            pro: Sequelize.DOUBLE,
            carb: Sequelize.DOUBLE,
            fat: Sequelize.DOUBLE
        }, {
            timestamps: false
        });
    }
    async temp_insert(specs, sname) {
        const food = await this.temp_makeTable();
        // this.sequelize.sync({
        //     force: true
        // });
        await food.create({
            id: Date.now(),
            sname: sname,
            fullname: specs.title,
            cal: specs.cal,
            pro: specs.pro,
            carb: specs.carbs,
            fat: specs.fat
        });
    }
    async checkfood(sname) {
        try {
            const food = await this.temp_makeTable();
            const result = await food.findAll({
                where: {
                    sname: sname
                }
            });
            if (result.length === 1) {
                const res = result[0];
                return {
                    title: res['fullname'],
                    carbs: res['carb'],
                    cal: res['cal'],
                    pro: res['pro'],
                    fat: res['fat']
                };
            }
        }
        catch (e) {
            this.app.logger.error(e);
        }
        return null;
    }
}
exports.default = DatabaseService;
