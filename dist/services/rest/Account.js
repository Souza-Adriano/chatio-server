"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Account_1 = __importDefault(require("../../models/Account"));
class Account {
    constructor() {
        this.router = express_1.Router();
        this.create = async (request, response) => {
            try {
                const account = new Account_1.default();
                await account.create(request.body);
                response.status(204).send();
            }
            catch (error) {
                response.status(500).send('internal server error');
            }
        };
        this.init();
    }
    init() {
        this.router.post('/signup', this.create);
        this.router.post('/account', this.create);
        this.router.get('/account', this.list);
    }
    async list(request, response) {
        try {
            response.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map