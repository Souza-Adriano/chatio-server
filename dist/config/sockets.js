"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = require("../services/chat/Chat");
const Attendence_1 = require("../services/attendence/Attendence");
const SocketController_1 = __importDefault(require("../controllers/SocketController"));
exports.default = {
    user: [SocketController_1.default, Chat_1.UserChat, Attendence_1.Manager],
    customer: [SocketController_1.default, Chat_1.CustomerChat, Attendence_1.Queue],
};
//# sourceMappingURL=sockets.js.map