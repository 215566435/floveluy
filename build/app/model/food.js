"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const Sequelize = app.Sequelize;
    const food = ModelDefine_1.ModelDefine(app, 'food', {
        sname: Sequelize.STRING(20),
        fullname: Sequelize.STRING(255),
        cal: Sequelize.DOUBLE,
        pro: Sequelize.DOUBLE,
        carb: Sequelize.DOUBLE,
        fat: Sequelize.DOUBLE
    });
    return food;
};
