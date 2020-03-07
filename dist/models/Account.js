"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractModel_1 = __importDefault(require("./AbstractModel"));
const Enigma_1 = __importDefault(require("../lib/Enigma"));
class Account extends AbstractModel_1.default {
    constructor() {
        super();
        this.body = {
            create: ['name', 'email', 'password', 'nickname', 'confirmPassword'],
            authenticate: ['email', 'password'],
        };
        this.enigma = new Enigma_1.default();
    }
    async validateCreation(body) {
        try {
            this.validator.isValidBody(body, this.body.create);
            this.validator.isEmail(body.email, `${body.email} is not a valid email.`);
            this.validator.isEqual(body.password, body.confirmPassword, 'password and confirm password not match');
            this.validator.onLength(body.password, { max: 50, min: 6 }, 'password');
            this.validator.onLength(body.name, { min: 3, max: 50 }, 'name');
            this.validator.onLength(body.name, { min: 3, max: 50 }, 'nickname');
            const hash = await this.enigma.encrypt(body.password);
            return {
                id: this.genID(),
                name: body.name,
                nickname: body.nickname,
                email: body.email,
                password: hash,
                avatar: '/home/azuos/Apps/chatio/image/User.jpg',
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async validateAuthentication(body) {
        this.validator.isValidBody(body, this.body.authenticate);
        this.validator.isEmail(body.email, `is not a valid email`);
        return body;
    }
    async create(body) {
        try {
            const UserAccount = await this.validateCreation(body);
            await this.database('users')
                .insert(UserAccount);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async isAuthenticated(body) {
        const data = await this.validateAuthentication(body);
        const user = await this.database('users')
            .select('id', 'name', 'nickname', 'email', 'avatar', 'password')
            .where({ email: data.email })
            .first();
        if (!user) {
            throw new Error('invalid user/password');
        }
        const isValid = await this.enigma.validate(data.password, user.password);
        if (isValid === false) {
            throw new Error('invalid user/password');
        }
        return user;
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map