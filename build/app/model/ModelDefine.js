"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDefine = (app, name, attributes) => {
    const { BIGINT } = app.Sequelize;
    const Model = app.model.define(name, Object.assign({ id: {
            type: BIGINT,
            primaryKey: true
        } }, attributes), {
        timestamps: false
    });
    return Model;
};
