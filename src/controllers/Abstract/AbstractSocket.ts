import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';

abstract class AbstractSocket<SESSION> {
    protected socket: Socket;
    protected server: Server;
    protected session: SESSION;
    protected handler: EventEmitter;

    constructor(socket: Socket, server: Server, session: SESSION, handler: EventEmitter) {
        this.socket = socket;
        this.server = server;
        this.session = session;
        this.handler = handler;
    }

    protected iat(): string {
        return new Date().toUTCString();
    }

    protected disconnect(): void {
        this.socket.disconnect(true);
    }
}

export default AbstractSocket;