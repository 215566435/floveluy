import { SequelizeStatic, Sequelize } from 'sequelize';


exports.sequelize = {
    enable: true,
    package: "egg-sequelize"
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};

interface ValidateType {
    type: string
}

declare module 'egg' {
    export interface Application {
        Sequelize: SequelizeStatic
        model: Sequelize
    }
    export interface Context {
        validate: (b: {
            [key: string]: ValidateType
        }, body?: any) => {}
    }
}

