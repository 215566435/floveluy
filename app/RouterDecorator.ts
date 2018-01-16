

export class Route {
    route: any = {
    }

    get(url: string, controllerName: string) {
        var that = this;
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            that.route[url] = { propertyKey, controllerName, method: 'get' }
        };
    }

}