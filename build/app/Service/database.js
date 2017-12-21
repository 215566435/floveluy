"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var instance = undefined;
class DatabaseService extends egg_1.Service {
    constructor(props) {
        console.log('调用');
        super(props);
        if (!instance) {
            instance = this;
        }
        return instance;
    }
}
exports.default = DatabaseService;
