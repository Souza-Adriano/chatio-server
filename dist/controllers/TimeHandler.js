"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeHandler {
    constructor() { }
    toMS(value) {
        const key = Object.keys(value);
        const time = Object.values(value);
        const commands = ['seconds', 'minutes', 'hours', 'days', 'weeks'];
        const executor = [
            (value) => value * 1000,
            (value) => value * 1000 * 60,
            (value) => value * 1000 * 60 * 60,
            (value) => value * 1000 * 60 * 60 * 24,
            (value) => value * 1000 * 60 * 60 * 24 * 7,
        ];
        return key.reduce((total, handle) => {
            try {
                const result = executor[commands.indexOf(handle)](time[key.indexOf(handle)]);
                return total + result;
            }
            catch (error) {
                return total;
            }
        }, 0);
    }
}
exports.default = TimeHandler;
//# sourceMappingURL=TimeHandler.js.map