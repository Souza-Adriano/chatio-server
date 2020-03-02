"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./config/server"));
const middlewares_1 = __importDefault(require("./config/middlewares"));
const routes_1 = __importDefault(require("./config/routes"));
const sockets_1 = __importDefault(require("./config/sockets"));
const App = new server_1.default({
    middlewares: middlewares_1.default,
    routes: routes_1.default,
    sockets: sockets_1.default,
});
App.start();
//# sourceMappingURL=app.js.map