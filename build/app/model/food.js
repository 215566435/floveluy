"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const { STRING, TIME } = app.Sequelize;
    const food = ModelDefine_1.ModelDefine(app, 'food', {
        sets: STRING(20),
        weight: STRING(40),
        time: TIME,
        surface: STRING(255),
        name: STRING(40)
    });
    return food;
};
