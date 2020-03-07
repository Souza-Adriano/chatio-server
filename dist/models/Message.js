"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = __importDefault(require("./AbstractModel"));
class Message extends AbstractModel_1.default {
    constructor() {
        super();
    }
    async create(list) {
        try {
            const messages = list.map((message) => {
                return {
                    id: this.genID(),
                    ...message,
                };
            });
            await this.database('messages')
                .insert(messages);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map