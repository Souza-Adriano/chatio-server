"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocket_1 = __importDefault(require("../../controllers/Abstract/AbstractSocket"));
const Queue_1 = __importDefault(require("../../models/Redis/Queue"));
class AbstractAttendence extends AbstractSocket_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.queue = new Queue_1.default(server);
    }
}
exports.default = AbstractAttendence;
//# sourceMappingURL=AbstractAttendence.js.map