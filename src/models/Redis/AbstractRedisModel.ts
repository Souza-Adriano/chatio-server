import Redis from '../../lib/Redis';

abstract class AbstractRedisModel {
    protected Redis = Redis;
    protected key: string;

    constructor(key: string) {
        this.key = key;
    }

    public extendKey(...extension: string[]): string {
        return `${this.key}:${extension.join(':')}`;
    }
}

export default AbstractRedisModel;