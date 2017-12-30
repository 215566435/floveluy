import { Application } from 'egg';
import { DefineAttributes } from 'sequelize';

export const ModelDefine = (app: Application, name: string, attributes: DefineAttributes) => {
    const { BIGINT } = app.Sequelize;
    const Model = app.model.define(name, {
        id: {
            type: BIGINT,
            primaryKey: true
        },
        ...attributes
    }, {
            timestamps: false
        }
    );
    return Model;
}
