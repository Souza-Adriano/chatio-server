import AbstractRedisModel from './AbstractRedisModel';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

import LogHandler from '../../controllers/LogHandler';

interface IncrementQueue {
    id: string;
    email: string;
    protocol?: string;
}

class Queue extends AbstractRedisModel {
    protected socketServer: Server;
    private logHandler = LogHandler;
    constructor( server: Server ) {
        super('CHAT:QUEUE');
        this.socketServer = server;
    }

    private protocolify(customer: IncrementQueue): IncrementQueue {
        return {
            protocol: uuid(),
            ...customer,
        };
    }

    public async produce(customer: IncrementQueue): Promise<void> {
        await this.Redis.connection.lpush(this.key, JSON.stringify(this.protocolify(customer)));
        this.Redis.events.emit(this.extendKey('change'));
    }

    public async consume(): Promise<IncrementQueue> {
        const customer = await this.Redis.connection.lpop(this.key);
        this.Redis.events.emit(this.extendKey('change'));
        return JSON.parse(customer);
    }

    public watch(): void {
        this.logHandler.info(`[REDIS] Queue watcher started`);
        this.Redis.events.on(this.extendKey('change'), async () => {
            try {
                const length: number = await this.Redis.connection.llen(this.key);
                this.socketServer.emit('queue:change', length.toString());
            } catch (error) {
                this.socketServer.emit('queue:change', '0');
            }
        });
    }
}

export default Queue;