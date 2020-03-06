"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAttendence_1 = __importDefault(require("./AbstractAttendence"));
class Manager extends AbstractAttendence_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.commands();
    }
    consumeQueue() {
        this.handler.on('queue:consume', () => __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.queue.consume();
            this.server.to(this.session.email).emit('queue:change', customer);
        }));
    }
    commands() {
        this.consumeQueue();
    }
}
exports.Manager = Manager;
class Queue extends AbstractAttendence_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.commands();
    }
    produce() {
        const DTO = { id: this.session.id, email: this.session.email };
        this.queue.produce(DTO)
            .catch(console.error);
    }
    commands() {
        this.produce();
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Attendence.js.map