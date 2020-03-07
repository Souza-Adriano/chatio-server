"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractJob_1 = __importDefault(require("./AbstractJob"));
const Message_1 = __importDefault(require("../models/Message"));
const MessageStorage_1 = __importDefault(require("../models/Redis/MessageStorage"));
class MessageJob extends AbstractJob_1.default {
    constructor() {
        super('Message');
    }
    async start() {
        if (this.config.MESSAGE.active === true) {
            const Model = new Message_1.default();
            const Storage = new MessageStorage_1.default();
            this.logStatusOn();
            setInterval(async () => {
                try {
                    const collection = await Storage.collect();
                    await Promise.all(collection.map(async (messages) => {
                        await Model.create(messages);
                    }));
                    this.logJob();
                }
                catch (error) {
                    this.logFail(error);
                }
            }, this.timeHandle.toMS(this.config.MESSAGE.interval));
        }
        else {
            this.logStatusOff();
        }
    }
}
exports.default = MessageJob;
//# sourceMappingURL=Messages.js.map