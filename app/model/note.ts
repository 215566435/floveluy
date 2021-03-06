import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';

module.exports = (app: Application) => {
    const { STRING, BIGINT } = app.Sequelize;

    const note = ModelDefine(app, 'note', {
        sets: STRING(20),
        weight: STRING(40),
        time: BIGINT,
        surface: STRING(255),
        name: STRING(40)
    });

    return note;
};

