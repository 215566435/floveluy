function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log({ target, propertyKey, descriptor })
    };
}
