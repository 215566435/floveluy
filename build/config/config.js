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
    return Object.assign({}, config, DefaultConfig_1.default);
};
