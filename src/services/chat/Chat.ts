
import { Socket, Server} from 'socket.io';
import { EventEmitter } from 'events';
import { UserSession, CustomerSession} from '../authentication/Authentication';
import AbstractChat from './AbstractChat';

export class UserChat extends AbstractChat<UserSession> {
    constructor(socket: Socket, server: Server, session: UserSession, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.commands();
    }

    protected messenger = this.sendMessage(this.session);
    protected attachment = {
        image: this.sendAttachment(this.session, 'image'),
        file: this.sendAttachment(this.session, 'file'),
    };

    protected commands() {
        this.handler.on('send:message', this.messenger);
        this.handler.on('attachment:file', this.attachment.file);
        this.handler.on('attachment:image', this.attachment.image);
    }
}

export class CustomerChat extends AbstractChat<CustomerSession> {
    constructor(socket: Socket, server: Server, session: CustomerSession, handler: EventEmitter) {
        super(socket, server, session, handler);
        this.commands();
    }

    protected messenger = this.sendMessage(this.session);
    protected attachment = {
        image: this.sendAttachment(this.session, 'image'),
        file: this.sendAttachment(this.session, 'file'),
    };

    protected commands() {
        this.handler.on('send:message', this.messenger);
        this.handler.on('attachment:file', this.attachment.file);
        this.handler.on('attachment:image', this.attachment.image);
    }
}