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
    validateCreation(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validator.isValidBody(body, this.body.create);
                this.validator.isEmail(body.email, `${body.email} is not a valid email.`);
                this.validator.isEqual(body.password, body.confirmPassword, 'password and confirm password not match');
                this.validator.onLength(body.password, { max: 50, min: 6 }, 'password');
                this.validator.onLength(body.name, { min: 3, max: 50 }, 'name');
                this.validator.onLength(body.name, { min: 3, max: 50 }, 'nickname');
                const hash = yield this.enigma.encrypt(body.password);
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
        });
    }
    validateAuthentication(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validator.isValidBody(body, this.body.authenticate);
            this.validator.isEmail(body.email, `is not a valid email`);
            return body;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserAccount = yield this.validateCreation(body);
                yield this.database('users')
                    .insert(UserAccount);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    isAuthenticated(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.validateAuthentication(body);
            const user = yield this.database('users')
                .select('id', 'name', 'nickname', 'email', 'avatar', 'password')
                .where({ email: data.email })
                .first();
            if (!user) {
                throw new Error('invalid user/password');
            }
            const isValid = yield this.enigma.validate(data.password, user.password);
            if (isValid === false) {
                throw new Error('invalid user/password');
            }
            return user;
        });
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map