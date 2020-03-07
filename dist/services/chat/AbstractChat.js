"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocket_1 = __importDefault(require("../../controllers/Abstract/AbstractSocket"));
const MessageStorage_1 = __importDefault(require("../../models/Redis/MessageStorage"));
class AbstractChat extends AbstractSocket_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
    }
    sendMessage(session) {
        const Storage = new MessageStorage_1.default();
        return (data) => {
            const message = { from: session.email, iat: this.iat(), name: session.name, content: data.content };
            Storage.store({ protocol: data.protocol, from: session.email, content: data.content, to: data.to })
                .then(() => this.socket.to(data.to).emit('message', message))
                .catch(console.error);
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
            this.socket.to(data.to).emit(`attachment:${type}`, message);
        };
    }
}
exports.default = AbstractChat;
//# sourceMappingURL=AbstractChat.js.map