import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';



module.exports = (app: Application) => {
    const { STRING, INTEGER } = app.Sequelize;

    const days = ModelDefine(app, 'days', {
        title: STRING(128),
        bodypart: INTEGER,
        surface: {
            type: STRING(128),
            allowNull: true
        },
        plan_id: {
            type: INTEGER,
            allowNull: false
        },
        days_id: {
            type: INTEGER,
            allowNull: false
        }
    });

    return days;
};

