"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractChat_1 = __importDefault(require("./AbstractChat"));
class UserChat extends AbstractChat_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.messenger = this.sendMessage(this.session);
        this.attachment = {
            image: this.sendAttachment(this.session, 'image'),
            file: this.sendAttachment(this.session, 'file'),
        };
        this.commands();
    }
    commands() {
        this.handler.on('send:message', this.messenger);
        this.handler.on('attachment:file', this.attachment.file);
        this.handler.on('attachment:image', this.attachment.image);
    }
}
exports.UserChat = UserChat;
class CustomerChat extends AbstractChat_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.messenger = this.sendMessage(this.session);
        this.attachment = {
            image: this.sendAttachment(this.session, 'image'),
            file: this.sendAttachment(this.session, 'file'),
        };
        this.commands();
    }
    commands() {
        this.handler.on('send:message', this.messenger);
        this.handler.on('attachment:file', this.attachment.file);
        this.handler.on('attachment:image', this.attachment.image);
    }
}
exports.CustomerChat = CustomerChat;
//# sourceMappingURL=Chat.js.map