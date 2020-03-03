"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractSocket {
    constructor(socket, server, session) {
        this.socket = socket;
        this.server = server;
        this.session = session;
    }
    disconnect() {
        this.socket.disconnect(true);
    }
}
exports.default = AbstractSocket;
//# sourceMappingURL=AbstractSocket.js.map