import { Application } from 'egg';
import { ModelDefine } from './ModelDefine';



module.exports = (app: Application) => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;

    const exercise = ModelDefine(app, 'exercise', {
        title: STRING(128),
        description: TEXT,
        image: {
            type: STRING(128),
            allowNull: true
        },
        plan_id: {
            type: INTEGER,
            allowNull: false
        },
        detail: app.Sequelize.JSON,
        daysID: {
            type: INTEGER,
            allowNull: false
        }
    });

    return exercise;
};

