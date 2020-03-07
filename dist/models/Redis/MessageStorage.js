"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRedisModel_1 = __importDefault(require("./AbstractRedisModel"));
class MessageStorage extends AbstractRedisModel_1.default {
    constructor() {
        super(`MESSAGE:HISTORY`);
    }
    async store(message) {
        const data = {
            protocol: message.protocol,
            from: message.from,
            content: message.content,
            to: message.to,
        };
        await this.Redis.connection
            .lpush(this.extendKey(message.protocol), JSON.stringify(data));
    }
    async collect() {
        const keys = await this.getKeys();
        const historysKeys = await this.addLength(keys);
        const historys = await this.getHistory(historysKeys);
        const messageHistory = await this.parseMessages(historys);
        return messageHistory;
    }
    getKeys() {
        return this.Redis.connection.keys(`${this.key}*`);
    }
    async addLength(keys) {
        const lengthPromisses = keys.map(async (key) => {
            const size = await this.Redis.connection.llen(key);
            return { key, size, trim: size + 1 };
        });
        const list = await Promise.all(lengthPromisses);
        return list;
    }
    async getHistory(keys) {
        const historyPromisses = keys.map(async (data) => {
            return await this.Redis.connection
                .multi()
                .lrange(data.key, 0, data.size)
                .llen(data.key)
                .ltrim(data.key, data.trim, -1)
                .exec()
                .then((result) => result[0][1]);
        });
        return await Promise.all(historyPromisses);
    }
    async parseMessages(historys) {
        const messagesPromisse = historys.map(async (history) => {
            return history.map((message) => JSON.parse(message));
        });
        const list = await Promise.all(messagesPromisse);
        return list;
    }
}
exports.default = MessageStorage;
//# sourceMappingURL=MessageStorage.js.map