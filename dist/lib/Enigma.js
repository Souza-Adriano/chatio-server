"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class Enigma {
    constructor(salt = 10) {
        this.salt = salt;
    }
    async encrypt(data) {
        return await bcrypt_1.hash(data, await bcrypt_1.genSalt(this.salt));
    }
    async validate(data, hash) {
        return await bcrypt_1.compare(data, hash);
    }
}
exports.default = Enigma;
//# sourceMappingURL=Enigma.js.map