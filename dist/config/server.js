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
const LogHandler_1 = __importDefault(require("../controllers/LogHandler"));
class App {
    constructor(init) {
        this.ENV = env_1.default.get('APP');
        this.logHandler = LogHandler_1.default;
        this.app = express_1.default();
        this.port = this.ENV.PORT;
        this.Http = http_1.createServer(this.app);
        this.SocketServer = IO.default(this.Http);
        this.sockets(init.sockets);
        this.middlewares(init.middlewares);
        this.routes(init.routes);
        this.watchers(init.watchers);
        this.jobs(init.jobs);
        this.logHandler.logger();
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => this.app.use(middleWare));
    }
    routes(routes) {
        routes.forEach((route) => this.app.use('/', route.router));
    }
    sockets(sockets) {
        this.SocketServer.on('connection', (socket) => {
            const session = socket.handshake.query;
            socket.join(socket.handshake.query.email);
            const handler = new events_1.EventEmitter();
            session.type === 'user'
                ? sockets.user.forEach((SocketEvent) => new SocketEvent(socket, this.SocketServer, session, handler))
                : sockets.customer.forEach((SocketEvent) => new SocketEvent(socket, this.SocketServer, session, handler));
        });
    }
    watchers(watchers) {
        watchers.forEach((subscribe) => {
            const watcher = new subscribe(this.SocketServer);
            watcher.watch();
        });
    }
    jobs(jobs) {
        jobs.forEach((Job) => {
            const job = new Job();
            job.start();
        });
    }
    start() {
        this.Http.listen(this.port, () => {
            console.log(`[INFO] App listening on port ${this.port}`);
            console.log(`[INFO] http://localhost:${this.port}`);
            console.log(`[INFO] Press CTRL + C to stop server`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=server.js.map