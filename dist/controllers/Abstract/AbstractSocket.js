"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractSocket {
    constructor(socket, server, session, handler) {
        this.socket = socket;
        this.server = server;
        this.session = session;
        this.handler = handler;
    }
    iat() {
        return new Date().toUTCString();
    }
    disconnect() {
        this.socket.disconnect(true);
    }
}
exports.default = AbstractSocket;
//# sourceMappingURL=AbstractSocket.js.map