import Redis from '../../lib/Redis';
import { Server } from 'socket.io';

abstract class AbstractRedisModel {
    protected Redis = Redis;
    protected key: string;
    protected socketServer: Server;

    constructor(key: string, server: Server) {
        this.key = key;
        this.socketServer = server;
    }

    public extendKey(...extension: string[]): string {
        return `${this.key}:${extension.join(':')}`;
    }
}

export default AbstractRedisModel;