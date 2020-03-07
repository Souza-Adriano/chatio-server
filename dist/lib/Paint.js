"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Printer {
    static red(msg) {
        console.log(this.hex('#ff5555')(msg));
    }
    static blue(msg) {
        console.log(this.hex('#147AFF')(msg));
    }
    static green(msg) {
        console.log(this.hex('#50fa7b')(msg));
    }
    static yellow(msg) {
        console.log(this.hex('#EBA809')(msg));
    }
}
exports.Printer = Printer;
Printer.hex = chalk_1.hex;
class Painter {
    static red(msg) {
        return this.hex('#ff5555')(msg);
    }
    static blue(msg) {
        return this.hex('#147AFF')(msg);
    }
    static green(msg) {
        return this.hex('#50fa7b')(msg);
    }
    static yellow(msg) {
        return this.hex('#EBA809')(msg);
    }
}
exports.Painter = Painter;
Painter.hex = chalk_1.hex;
//# sourceMappingURL=Paint.js.map