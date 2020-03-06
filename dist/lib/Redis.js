"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = __importDefault(require("../config/env"));
const ENV = env_1.default.get('REDIS');
const events_1 = require("events");
class Redis {
}
Redis.events = new events_1.EventEmitter();
Redis.connection = new ioredis_1.default(ENV.PORT, ENV.HOST, { connectionName: 'chatio-server' });
exports.default = Redis;
//# sourceMappingURL=Redis.js.map