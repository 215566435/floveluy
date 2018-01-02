import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';

module.exports = (app: Application) => {
    const Sequelize = app.Sequelize;

    const food = ModelDefine(app, 'food', {
        sname: Sequelize.STRING(20),
        fullname: Sequelize.STRING(40),
        cal: Sequelize.DOUBLE,
        pro: Sequelize.DOUBLE,
        carb: Sequelize.DOUBLE,
        fat: Sequelize.DOUBLE
    });

    return food;
};
