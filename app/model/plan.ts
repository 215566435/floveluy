import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';



module.exports = (app: Application) => {
    const { STRING, TIME, BIGINT } = app.Sequelize;


    const plan = ModelDefine(app, 'plan', {
        title: STRING(20),
        sub_title: STRING(128),
        author: STRING(40),
        time: BIGINT,
        plan_id: {
            type: BIGINT,
            allowNull: false
        }
    });

    return plan;
};

