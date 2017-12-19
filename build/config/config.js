'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const DefaultConfig_1 = require("./DefaultConfig");
exports.default = (appInfo) => {
    const config = {};
    config.keys = 'floveluyKey12356';
    return Object.assign({}, config, DefaultConfig_1.default);
};
