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
const express_1 = require("express");
const Account_1 = __importDefault(require("../models/Account"));
const Session_1 = __importDefault(require("../controllers/Session"));
class Authenticate {
    constructor() {
        this.router = express_1.Router();
        this.validate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const account = new Account_1.default();
                const session = new Session_1.default();
                const user = yield account.isAuthenticated(request.body);
                const token = yield session.start(user);
                response.json({ token });
            }
            catch (error) {
            }
        });
        this.init();
    }
    init() {
        this.router.post('/signin', this.validate);
    }
}
exports.default = Authenticate;
//# sourceMappingURL=Authenticate.js.map