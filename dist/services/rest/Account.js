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
const Account_1 = __importDefault(require("../../models/Account"));
class Account {
    constructor() {
        this.router = express_1.Router();
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const account = new Account_1.default();
                yield account.create(request.body);
                response.status(204).send();
            }
            catch (error) {
                response.status(500).send('internal server error');
            }
        });
        this.init();
    }
    init() {
        this.router.post('/signup', this.create);
        this.router.post('/account', this.create);
        this.router.get('/account', this.list);
    }
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.sendStatus(200);
            }
            catch (error) {
                console.log(error);
                response.sendStatus(500);
            }
        });
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map