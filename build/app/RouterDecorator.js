"use strict";
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        console.log({ target, propertyKey, descriptor });
    };
}
