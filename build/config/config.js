'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const DefaultConfig_1 = require("./DefaultConfig");
exports.default = (appInfo) => {
    const config = {};
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
    config.sequelize = {
        dialect: "mysql",
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
    return Object.assign({}, config, DefaultConfig_1.default);
};
