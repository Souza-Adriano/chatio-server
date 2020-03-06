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
const Redis_1 = __importDefault(require("../lib/Redis"));
class AttendenceController {
    static increment(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Redis.lpush(this.key, JSON.stringify({ id, email }));
            this.Redis.emit(this.queueEvent.increment);
        });
    }
    static decrement() {
        this.Redis.emit(this.queueEvent.decrement);
    }
    static size(callback) {
        this.Redis.on(this.queueEvent.decrement, () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Redis.llen(this.key);
            callback(data);
        }));
        this.Redis.on(this.queueEvent.increment, () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Redis.llen(this.key);
            callback(data);
        }));
    }
    static consume(callback) {
        this.Redis.on(this.queueEvent.decrement, () => __awaiter(this, void 0, void 0, function* () {
            const data = JSON.parse(yield this.Redis.lpop(this.key));
            this.Redis.emit(this.queueEvent.size);
            callback(data);
        }));
    }
}
AttendenceController.Redis = Redis_1.default.connection;
AttendenceController.key = 'ATTENDENCE:QUEUE';
AttendenceController.queueEvent = {
    increment: 'ATTENDENCE:INCREMENT',
    decrement: 'ATTENDENCE:DECREMENT',
    size: 'ATTENDENCE:SIZE',
};
exports.default = AttendenceController;
//# sourceMappingURL=AttendenceController.js.map