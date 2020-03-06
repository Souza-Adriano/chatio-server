import AbstractSocket from '../../controllers/Abstract/AbstractSocket';
import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';
import Queue from '../../models/Redis/Queue';

abstract class AbstractAttendence<SESSION> extends AbstractSocket<SESSION> {
    protected queue: Queue;
    constructor(socket: Socket, server: Server, session: SESSION, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.queue = new Queue(server);
    }

    protected abstract commands(): void;
}

export default AbstractAttendence;