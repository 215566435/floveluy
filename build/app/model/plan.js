"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const { STRING, BIGINT } = app.Sequelize;
    const plan = ModelDefine_1.ModelDefine(app, 'plan', {
        title: STRING(20),
        sub_title: STRING(128),
        author: STRING(40),
        time: BIGINT
    });
    return plan;
};
