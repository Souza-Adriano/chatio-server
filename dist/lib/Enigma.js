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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class Enigma {
    constructor(salt = 10) {
        this.salt = salt;
    }
    encrypt(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.hash(data, yield bcrypt_1.genSalt(this.salt));
        });
    }
    validate(data, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.compare(data, hash);
        });
    }
}
exports.default = Enigma;
//# sourceMappingURL=Enigma.js.map