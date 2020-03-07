"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(require("../../lib/Redis"));
class AbstractRedisModel {
    constructor(key) {
        this.Redis = Redis_1.default;
        this.key = key;
    }
    extendKey(...extension) {
        return `${this.key}:${extension.join(':')}`;
    }
}
exports.default = AbstractRedisModel;
//# sourceMappingURL=AbstractRedisModel.js.map