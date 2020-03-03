"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const knex_1 = __importDefault(require("knex"));
const DBCONFIG = (ENV) => {
    const config = {
        client: ENV.CLIENT,
        db: ENV.DB,
        user: ENV.USER,
        password: ENV.PASSWORD,
        pool: {
            min: ENV.MINPOOL,
            max: ENV.MAXPOOL,
        },
        migrations: ENV.MIGRATIONS,
    };
    return {
        client: config.client,
        connection: {
            database: config.db,
            user: config.user,
            password: config.password,
        },
        pool: {
            min: config.pool.min,
            max: config.pool.max,
        },
        migrations: {
            tableName: config.migrations,
        },
    };
};
const Database = knex_1.default(DBCONFIG(env_1.default.get('DATABASE')));
exports.default = Database;
//# sourceMappingURL=database.js.map