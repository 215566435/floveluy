"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const { STRING, INTEGER, BIGINT } = app.Sequelize;
    const days = ModelDefine_1.ModelDefine(app, 'days', {
        title: STRING(128),
        day: INTEGER,
        bodypart: INTEGER,
        surface: {
            type: STRING(128),
            allowNull: true
        },
        planID: {
            type: INTEGER,
            unique: true
        },
        days_id: {
            type: INTEGER,
            allowNull: false
        }
    });
    return days;
};
