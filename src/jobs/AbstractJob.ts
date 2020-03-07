import config from './config.json';
import TimeHandler from '../controllers/TimeHandler';
import LogHandler from '../controllers/LogHandler';

abstract class AbstractJob {
    protected timeHandle: TimeHandler;
    protected config = config;
    protected jobName: string;
    protected logHandler = LogHandler;
    constructor(name: string) {
        this.timeHandle = new TimeHandler();
        this.jobName = name;
    }

    public logInfo(): void {
        this.logHandler.info(`executing ${this.jobName} job`);
    }

    public logFail(error: any): void {
        this.logHandler.fail(`executing ${this.jobName} job \n  -> ${error}`);
    }
    public abstract async start(): Promise<void>;
}

export default AbstractJob;