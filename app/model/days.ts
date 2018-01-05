import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';



module.exports = (app: Application) => {
    const { STRING, INTEGER, BIGINT } = app.Sequelize;

    const days = ModelDefine(app, 'days', {
        title: STRING(128),
        day: INTEGER,
        bodypart: INTEGER,
        surface: {
            type: STRING(128),
            allowNull: true
        },
        planID: {
            type: INTEGER,
            unique: true
        },
        days_id: {
            type: INTEGER,
            allowNull: false
        }
    });

    return days;
};

