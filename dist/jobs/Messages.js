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
        const Model = new Message_1.default();
        const Storage = new MessageStorage_1.default();
        setInterval(async () => {
            try {
                const collection = await Storage.collect();
                await Promise.all(collection.map(async (messages) => {
                    await Model.create(messages);
                }));
                this.logInfo();
            }
            catch (error) {
                this.logFail(error);
            }
        }, this.timeHandle.toMS(this.config.MESSAGE.interval));
    }
}
exports.default = MessageJob;
//# sourceMappingURL=Messages.js.map