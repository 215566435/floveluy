import { SequelizeStatic, Sequelize } from 'sequelize';


exports.sequelize = {
    enable: true,
    package: "egg-sequelize"
};

declare module 'egg' {
    export interface Application {
        Sequelize: SequelizeStatic
        model: Sequelize
    }
}