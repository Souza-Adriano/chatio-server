"use strict";
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
        this.handler.on('queue:consume', async () => {
            const customer = await this.queue.consume();
            this.server.to(this.session.email).emit('queue:change', customer);
        });
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