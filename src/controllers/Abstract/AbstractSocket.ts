import { Socket, Server} from 'socket.io';

abstract class AbstractSocket<SESSION> {
    protected socket: Socket;
    protected server: Server;
    protected session: SESSION;

    constructor(socket: Socket, server: Server, session: SESSION) {
        this.socket = socket;
        this.server = server;
        this.session = session;
    }

    protected disconnect(): void {
        this.socket.disconnect(true);
    }
}

export default AbstractSocket;