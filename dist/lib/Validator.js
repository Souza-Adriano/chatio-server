"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor() { }
    isEmail(value, msg) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
            throw new RangeError(msg);
        }
    }
    isEqual(valueA, valueB, msg) {
        if (valueA !== valueB) {
            throw new RangeError(msg);
        }
    }
    isNotEqual(valueA, valueB, msg) {
        if (valueA === valueB) {
            throw new RangeError(msg);
        }
    }
    onLength(value, length, propertie) {
        if (!length.min || length.min === 0) {
            length.min = 1;
        }
        if (!length.max) {
            length.max = 255;
        }
        if (value.length > length.max) {
            throw new RangeError(`${propertie} max length is ${length.max - 1} and you inputed ${value.length}`);
        }
        if (value.length < length.min) {
            throw new RangeError(`${propertie} min length is ${length.min} and you inputed ${value.length}`);
        }
    }
    isValidBody(body, expect) {
        const bodyProperties = Object.keys(body);
        const isExpected = expect.filter((item) => bodyProperties.indexOf(item) < 0);
        const isNotExpected = bodyProperties.filter((item) => expect.indexOf(item) < 0);
        if (isExpected.length > 0 || isNotExpected.length > 0) {
            throw new RangeError(`missing parameters: ${isExpected.join(', ')} \n unnecessary parameters: ${isNotExpected.join(', ')}`);
        }
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map