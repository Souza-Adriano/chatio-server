"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("./config.json"));
const TimeHandler_1 = __importDefault(require("../controllers/TimeHandler"));
const LogHandler_1 = __importDefault(require("../controllers/LogHandler"));
class AbstractJob {
    constructor(name) {
        this.config = config_json_1.default;
        this.logHandler = LogHandler_1.default;
        this.timeHandle = new TimeHandler_1.default();
        this.jobName = name;
    }
    logInfo() {
        this.logHandler.info(`executing ${this.jobName} job`);
    }
    logFail(error) {
        this.logHandler.fail(`executing ${this.jobName} job \n  -> ${error}`);
    }
}
exports.default = AbstractJob;
//# sourceMappingURL=AbstractJob.js.map