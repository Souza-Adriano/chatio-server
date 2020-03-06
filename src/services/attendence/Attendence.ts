import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';
import { UserSession, CustomerSession} from '../authentication/Authentication';
import AbstractAttendence from './AbstractAttendence';

export class Manager extends AbstractAttendence<UserSession> {
    constructor(socket: Socket, server: Server, session: UserSession, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.commands();
    }

    private consumeQueue() {
        this.handler.on('queue:consume', async () => {
            const customer = await this.queue.consume();
            this.server.to(this.session.email).emit('queue:change', customer);
        });
    }

    protected commands() {
        this.consumeQueue();
    }
}

export class Queue extends AbstractAttendence<CustomerSession> {67
    constructor(socket: Socket, server: Server, session: CustomerSession, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.commands();
    }

    private produce(): void {
        const DTO = { id: this.session.id, email: this.session.email }
        this.queue.produce(DTO)
            .catch(console.error);
    }

    protected commands() {
        this.produce();
    }
}