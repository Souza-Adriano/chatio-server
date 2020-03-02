"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
class ENV {
    constructor() {
        this.reduceToProps = (prefix, values) => (obj, item) => {
            Object.defineProperty(obj, item.key.replace(prefix, ''), { value: this.parseProp(values[item.index]), enumerable: true, writable: false });
            return obj;
        };
        dotenv_1.config();
        this.env = process.env;
        this.values = Object.values(this.env);
        this.namespaces = this.getNamespaces()
            .map((namespace) => (Object.assign({ namespace }, this.getProps(`${namespace}_`))));
    }
    parseProp(value) {
        return isNaN(Number(value)) ? value : Number(value);
    }
    getNamespaces() {
        return Object.keys(this.env)
            .reduce((list, key) => {
            const namespace = key.split('_')[0];
            if (list.includes(namespace) !== true) {
                list.push(namespace);
            }
            return list;
        }, []);
    }
    getProps(prefix) {
        const Props = Object.keys(this.env)
            .map((key, index) => ({ key, index }))
            .filter((item) => item.key.includes(prefix))
            .reduce(this.reduceToProps(prefix, this.values), {});
        return Object.freeze(Props);
    }
    static getInstance() {
        if (!ENV.instance) {
            ENV.instance = new ENV();
        }
        return ENV.instance;
    }
    get(namespace) {
        try {
            const nspace = this.namespaces.find((item) => item.namespace === namespace);
            if (nspace === undefined) {
                throw new Error('namespace not exists on your .env file');
            }
            return nspace;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ENV.getInstance();
//# sourceMappingURL=env.js.map