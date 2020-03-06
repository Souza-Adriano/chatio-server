import AbstractSocket from './Abstract/AbstractSocket';
import { UserSession, CustomerSession} from '../services/authentication/Authentication';
import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';

interface SocketCommand {
    command: string;
    data: any;
}

class SocketController extends AbstractSocket<UserSession | CustomerSession> {
    constructor(socket: Socket, server: Server, session: UserSession, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.commander();
    }

    private commander() {
        this.socket.on('command', (obj: SocketCommand) => {
            console.log('handler: obj');
            console.log(obj);
            this.handler.emit(obj.command, obj.data);
        });
    }
}

export default SocketController;