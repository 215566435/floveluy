import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';

module.exports = (app: Application) => {
    const { STRING, TIME } = app.Sequelize;

    const food = ModelDefine(app, 'food', {
        sets: STRING(20),
        weight: STRING(40),
        time: TIME,
        surface: STRING(255),
        name: STRING(40)
    });

    return food;
};

