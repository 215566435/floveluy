"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (app) => {
    const { STRING, INTEGER, DATE, BIGINT, DOUBLE } = app.Sequelize;
    const food = app.model.define('food', {
        id: {
            type: BIGINT,
            primaryKey: true
        },
        sname: STRING(20),
        fullname: STRING(40),
        cal: DOUBLE,
        pro: DOUBLE,
        carb: DOUBLE,
        fat: DOUBLE
    }, {
        timestamps: false
    });
    return food;
};
