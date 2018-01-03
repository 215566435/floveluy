"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const { STRING, BIGINT } = app.Sequelize;
    const note = ModelDefine_1.ModelDefine(app, 'note', {
        sets: STRING(20),
        weight: STRING(40),
        time: BIGINT,
        surface: STRING(255),
        name: STRING(40)
    });
    return note;
};
