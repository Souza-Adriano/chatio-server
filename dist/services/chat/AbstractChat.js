"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocket_1 = __importDefault(require("../../controllers/Abstract/AbstractSocket"));
class AbstractChat extends AbstractSocket_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
    }
    sendMessage(session) {
        return (data) => {
            const message = {
                from: session.email,
                iat: this.iat(),
                name: session.name,
                content: data.content,
            };
            this.socket.to(data.destiny).emit('message', message);
        };
    }
    sendAttachment(session, type) {
        return (data) => {
            const message = {
                from: session.email,
                iat: this.iat(),
                name: session.name,
                content: data.content,
            };
            this.socket.to(data.destiny).emit(`attachment:${type}`, message);
        };
    }
}
exports.default = AbstractChat;
//# sourceMappingURL=AbstractChat.js.map