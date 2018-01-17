import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';



module.exports = (app: Application) => {
    const { STRING, BIGINT } = app.Sequelize;


    const plan = ModelDefine(app, 'plan', {
        title: STRING(20),
        sub_title: STRING(128),
        author: STRING(40),
        time: BIGINT
    });

    return plan;
};

