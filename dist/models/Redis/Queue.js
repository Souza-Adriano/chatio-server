"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRedisModel_1 = __importDefault(require("./AbstractRedisModel"));
const uuid_1 = require("uuid");
const LogHandler_1 = __importDefault(require("../../controllers/LogHandler"));
class Queue extends AbstractRedisModel_1.default {
    constructor(server) {
        super('CHAT:QUEUE');
        this.logHandler = LogHandler_1.default;
        this.socketServer = server;
    }
    protocolify(customer) {
        return {
            protocol: uuid_1.v4(),
            ...customer,
        };
    }
    async produce(customer) {
        await this.Redis.connection.lpush(this.key, JSON.stringify(this.protocolify(customer)));
        this.Redis.events.emit(this.extendKey('change'));
    }
    async consume() {
        const customer = await this.Redis.connection.lpop(this.key);
        this.Redis.events.emit(this.extendKey('change'));
        return JSON.parse(customer);
    }
    watch() {
        this.logHandler.info(`[REDIS] Queue watcher started`);
        this.Redis.events.on(this.extendKey('change'), async () => {
            try {
                const length = await this.Redis.connection.llen(this.key);
                this.socketServer.emit('queue:change', length.toString());
            }
            catch (error) {
                this.socketServer.emit('queue:change', '0');
            }
        });
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map