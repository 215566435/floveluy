"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
