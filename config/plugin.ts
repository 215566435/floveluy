import { SequelizeStatic, Sequelize } from 'sequelize';
const path = require('path');

exports.sequelize = {
    enable: true,
    package: "egg-sequelize"
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};
exports.blueprint = {
    enable: true,
    path: path.join(__dirname, '../app/lib/egg-blueprint'),
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

