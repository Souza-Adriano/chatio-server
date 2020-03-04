import AbstractSocket from '../../controllers/Abstract/AbstractSocket';
import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';

abstract class AbstractChat<SESSION> extends AbstractSocket<SESSION> {
    constructor(socket: Socket, server: Server, session: SESSION, handler: EventEmitter) {
        super(socket, server, session, handler);
    }

    protected sendMessage(session: any): (data: any) => void {
        return (data: any): void => {
            const message = {
                from: session.email,
                iat: this.iat(),
                name: session.name,
                content: data.content,
            };
            this.socket.to(data.destiny).emit('message', message);
        };
    }

    protected sendAttachment(session: any, type: string): (data: any) => void {
        return (data: any): void => {
            const message = {
                from: session.email,
                iat: this.iat(),
                name: session.name,
                content: data.content,
            };
            this.socket.to(data.destiny).emit(`attachment:${type}`, message);
        };
    }

    protected abstract messenger: (data: any) => void;
    protected abstract attachment: {
        image: (data: any) => void;
        file: (data: any) => void;
    };
}

export default AbstractChat;