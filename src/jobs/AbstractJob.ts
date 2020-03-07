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

    public logJob(): void {
        this.logHandler.success(`Starting ${this.jobName} job`);
    }

    public logFail(error: any): void {
        this.logHandler.fail(`Starting ${this.jobName} job \n  -> ${error}`);
    }

    public logStatusOff() {
        this.logHandler.warning(`[JOB] ${this.jobName} Stoped`);
    }

    public logStatusOn() {
        this.logHandler.info(`[JOB] ${this.jobName} Running`);
    }
    public abstract async start(): Promise<void>;
}

export default AbstractJob;