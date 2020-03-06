import redis from 'ioredis';
import env from '../config/env';
const ENV = env.get('REDIS');
import { EventEmitter } from 'events';

class Redis {
    public static events: EventEmitter = new EventEmitter();
    public static connection = new redis(ENV.PORT, ENV.HOST, { connectionName: 'chatio-server' });
}

export default Redis;