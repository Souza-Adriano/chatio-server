import AbstractRedisModel from './AbstractRedisModel';
import { Server } from 'socket.io';

interface IncrementQueue {
    id: string;
    email: string;
}

class Queue extends AbstractRedisModel {
    constructor( server: Server ) {
        super('CHAT:QUEUE', server);
    }

    public async produce(customer: IncrementQueue): Promise<void> {
        await this.Redis.connection.lpush(this.key, JSON.stringify(customer));
        this.Redis.events.emit(this.extendKey('change'));
    }

    public async consume(): Promise<IncrementQueue> {
        const customer = await this.Redis.connection.lpop(this.key);
        this.Redis.events.emit(this.extendKey('change'));
        return JSON.parse(customer);
    }

    public watch(): void {
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