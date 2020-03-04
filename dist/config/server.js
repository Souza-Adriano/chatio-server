"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const IO = __importStar(require("socket.io"));
const env_1 = __importDefault(require("./env"));
const events_1 = require("events");
class App {
    constructor(init) {
        this.ENV = env_1.default.get('APP');
        this.app = express_1.default();
        this.port = this.ENV.PORT;
        this.Http = http_1.createServer(this.app);
        this.SocketServer = IO.default(this.Http);
        this.sockets(init.sockets);
        this.middlewares(init.middlewares);
        this.routes(init.routes);
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => this.app.use(middleWare));
    }
    routes(routes) {
        routes.forEach((route) => this.app.use('/', route.router));
    }
    sockets(socketEvents) {
        this.SocketServer.on('connection', (socket) => {
            const session = socket.handshake.query;
            socket.join(socket.handshake.query.email);
            const handler = new events_1.EventEmitter();
            socketEvents.forEach((SocketEvent) => new SocketEvent(socket, this.SocketServer, session, handler));
        });
    }
    start() {
        this.Http.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=server.js.map