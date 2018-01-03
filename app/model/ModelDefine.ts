import { Application } from 'egg';
import { DefineAttributes } from 'sequelize';

export const ModelDefine = (app: Application, name: string, attributes: DefineAttributes) => {
    const { BIGINT, INTEGER } = app.Sequelize;
    const Model = app.model.define(name, {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        ...attributes
    }, {
            timestamps: false
        }
    );
    return Model;
}
