import express from 'express';
import { Application } from 'express';
import { createServer, Server } from 'http';
import * as IO from 'socket.io';
import Env from './env';
import { EventEmitter } from 'events';
import { ServerOptions, SocketOptions } from './interfaces';
import LogHandler from '../controllers/LogHandler';

// Stetic Import
import {Printer} from '../lib/Paint';
//
class App {
    public app: Application;
    private ENV = Env.get('APP');
    private port: number;
    private Http: Server;
    private SocketServer: IO.Server;
    private logHandler = LogHandler;

    constructor(init: ServerOptions) {
        this.app = express();
        this.port = this.ENV.PORT;
        this.Http = createServer(this.app);
        this.logHandler.logger();
        this.SocketServer = IO.default(this.Http);
        this.sockets(init.sockets);
        this.middlewares(init.middlewares);
        this.routes(init.routes);
        this.watchers(init.watchers);
        this.jobs(init.jobs);
        
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach((middleWare) => this.app.use(middleWare));
    }

    private routes(routes: { forEach: (arg0: (routes: any) => void) => void; }) {
        routes.forEach((route) => this.app.use('/', route.router));
    }

    private sockets(sockets: SocketOptions): void {
        this.logHandler.info(`[SOCKET] Server is running`)
        this.SocketServer.on('connection', (socket) => {
            const session = socket.handshake.query;
            socket.join(socket.handshake.query.email);
            const handler = new EventEmitter();

            session.type === 'user'
                ? sockets.user.forEach((SocketEvent) =>
                    new SocketEvent(socket, this.SocketServer, session, handler))
                : sockets.customer.forEach((SocketEvent) =>
                    new SocketEvent(socket, this.SocketServer, session, handler));
        });
    }

    private watchers(watchers: any[]): void {
        watchers.forEach((subscribe) => {
            const watcher = new subscribe(this.SocketServer);
            watcher.watch();
        });
    }

    private jobs(jobs: any[]): void {
        jobs.forEach((Job: any) => {
            const job = new Job();
            job.start();
        });
    }

    public start() {
        this.Http.listen(this.port, () => {
            console.log(`\n-------------------------------------------------------------------------\n`);
            Printer.green(`[STATUS] App listening on port ${this.port}`);
            Printer.yellow(`[INFO] Press CTRL + C to stop server`);
            console.log(`\n-------------------------------------------------------------------------\n`);
        });
    }
}

export default App;