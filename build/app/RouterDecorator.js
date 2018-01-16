"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor() {
        this.route = {};
    }
    get(url, controllerName) {
        var that = this;
        return function (target, propertyKey, descriptor) {
            that.route[url] = { propertyKey, controllerName, method: 'get' };
        };
    }
}
exports.Route = Route;
