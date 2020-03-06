"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRedisModel_1 = __importDefault(require("./AbstractRedisModel"));
class Queue extends AbstractRedisModel_1.default {
    constructor(server) {
        super('CHAT:QUEUE', server);
    }
    produce(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Redis.connection.lpush(this.key, JSON.stringify(customer));
            this.Redis.events.emit(this.extendKey('change'));
        });
    }
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.Redis.connection.lpop(this.key);
            this.Redis.events.emit(this.extendKey('change'));
            return JSON.parse(customer);
        });
    }
    watch() {
        this.Redis.events.on(this.extendKey('change'), () => __awaiter(this, void 0, void 0, function* () {
            try {
                const length = yield this.Redis.connection.llen(this.key);
                this.socketServer.emit('queue:change', length.toString());
            }
            catch (error) {
                this.socketServer.emit('queue:change', '0');
            }
        }));
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map