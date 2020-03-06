"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocket_1 = __importDefault(require("./Abstract/AbstractSocket"));
class SocketController extends AbstractSocket_1.default {
    constructor(socket, server, session, handler) {
        super(socket, server, session, handler);
        this.commander();
    }
    commander() {
        this.socket.on('command', (obj) => {
            console.log('handler: obj');
            console.log(obj);
            this.handler.emit(obj.command, obj.data);
        });
    }
}
exports.default = SocketController;
//# sourceMappingURL=SocketController.js.map