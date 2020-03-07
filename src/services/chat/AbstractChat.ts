import AbstractSocket from '../../controllers/Abstract/AbstractSocket';
import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';
import MessageStorage from '../../models/Redis/MessageStorage';

abstract class AbstractChat<SESSION> extends AbstractSocket<SESSION> {
    constructor(socket: Socket, server: Server, session: SESSION, handler: EventEmitter) {
        super(socket, server, session, handler);
    }

    protected sendMessage(session: any): (data: any) => void {
        const Storage = new MessageStorage();
        return (data: any): void => {
            const message = { from: session.email, iat: this.iat(), name: session.name, content: data.content };

            Storage.store({protocol: data.protocol, from: session.email, content: data.content, to: data.to})
                .then(() => this.socket.to(data.to).emit('message', message))
                .catch(console.error);
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
            this.socket.to(data.to).emit(`attachment:${type}`, message);
        };
    }

    protected abstract messenger: (data: any) => void;
    protected abstract attachment: {
        image: (data: any) => void;
        file: (data: any) => void;
    };

    protected abstract commands(): void;
}

export default AbstractChat;