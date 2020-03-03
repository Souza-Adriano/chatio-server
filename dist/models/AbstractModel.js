"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("uuid");
const Validator_1 = __importDefault(require("../lib/Validator"));
class AbstractModel {
    constructor() {
        this.database = database_1.default;
        this.genID = uuid_1.v4;
        this.validator = new Validator_1.default();
    }
}
exports.default = AbstractModel;
//# sourceMappingURL=AbstractModel.js.map