"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelDefine_1 = require("./ModelDefine");
module.exports = (app) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const exercise = ModelDefine_1.ModelDefine(app, 'exercise', {
        title: STRING(128),
        description: TEXT,
        image: {
            type: STRING(128),
            allowNull: true
        },
        plan_id: {
            type: INTEGER,
            allowNull: false
        },
        detail: app.Sequelize.JSON,
        daysID: {
            type: INTEGER,
            allowNull: false
        }
    });
    return exercise;
};
