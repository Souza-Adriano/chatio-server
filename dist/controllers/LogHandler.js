"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Paint_1 = require("../lib/Paint");
class LogHandler {
    static fail(msg) {
        this.events.emit('fail', msg);
    }
    static success(msg) {
        this.events.emit('success', msg);
    }
    static warning(msg) {
        this.events.emit('warning', msg);
    }
    static info(msg) {
        this.events.emit('info', msg);
    }
    static message(msg) {
        this.events.emit('message', msg);
    }
    static logger() {
        this.events.on('fail', (msg) => this.printer.red(msg));
        this.events.on('success', (msg) => this.printer.green(msg));
        this.events.on('warning', (msg) => this.printer.yellow(msg));
        this.events.on('info', (msg) => this.printer.blue(msg));
        this.events.on('message', (msg) => console.log(msg));
    }
}
LogHandler.events = new events_1.EventEmitter();
LogHandler.printer = Paint_1.Printer;
exports.default = LogHandler;
//# sourceMappingURL=LogHandler.js.map