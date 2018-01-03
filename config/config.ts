'use strict';
import { EggAppConfig } from 'egg';
import 'source-map-support/register';
import defaultConfig from './DefaultConfig'

export default (appInfo: EggAppConfig) => {
    const config: any = {};
    config.keys = 'floveluyKey12356';
    config.middleware = ['wechat'];
    config.bodyParser = {
        extendTypes: {
            text: ['application/xml'],
        },
        enableTypes: ['text']
    };
    config.security = {
        csrf: {
            enable: false,
        }
    };

    config.sequelize = { // egg-sequelize 配置
        dialect: "mysql", // db type
        database: 'trainnote',
        host: "localhost",
        port: "3306",
        username: "root",
        password: "metal_gear2",
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            supportBigNumbers: true,
            bigNumberStrings: true
        },
        define: {
            'underscored': true,
            charset: 'utf8mb4'
        },
    };

    return { ...config, ...defaultConfig };
};