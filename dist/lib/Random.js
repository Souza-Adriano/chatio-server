"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Random {
    constructor(options = {}) {
        this.characters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
            'y', 'z',
        ];
        this.specials = [
            '!', '@', '#', '$',
            '%', '&', '*', '+',
            '-', ' ', '_', '?',
        ];
        if (options.characters) {
            this.characters = options.characters;
        }
        if (options.specials) {
            this.specials = options.specials;
        }
    }
    makeArray(size, callback) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(callback());
        }
        return arr;
    }
    getTypes(options) {
        const types = [];
        if (options.characters === true) {
            types.push('character');
        }
        if (options.numbers === true) {
            types.push('number');
        }
        if (options.specials === true) {
            types.push('special');
        }
        if (types.length === 0) {
            throw new Error('need 1 or more types to use;');
        }
        return types;
    }
    stringNumber() {
        return `${this.number(0, 9)}`;
    }
    number(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    character() {
        const max = this.characters.length - 1;
        return this.characters[this.number(0, max)];
    }
    special() {
        const max = this.specials.length - 1;
        return this.specials[this.number(0, max)];
    }
    alphanumeric() {
        const type = this.number(0, 1);
        if (type === 0) {
            return this.character();
        }
        if (type === 1) {
            return this.stringNumber();
        }
    }
    // tslint:disable-next-line: max-line-length
    string(size = 8, options = { characters: true, numbers: true, specials: true }) {
        const max = this.characters.length - 1;
        const randomString = this.makeArray(size, () => {
            const types = this.getTypes(options);
            const type = this.number(0, types.length - 1);
            if (types[type] === 'character') {
                return this.character();
            }
            if (types[type] === 'number') {
                return this.stringNumber();
            }
            if (types[type] === 'special') {
                return this.special();
            }
        });
        return randomString.join('');
    }
}
exports.default = Random;
//# sourceMappingURL=Random.js.map