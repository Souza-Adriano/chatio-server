import AbstractRedisModel from './AbstractRedisModel';
import { MessageModel } from '../Message';

interface HistoryKeys {
    key: string;
    size: number;
    trim: number;
}

class MessageStorage extends AbstractRedisModel {

    constructor() {
        super(`MESSAGE:HISTORY`);
    }

    public async store(message: MessageModel): Promise<void> {
        const data = {
            protocol: message.protocol,
            from: message.from,
            content: message.content,
            to: message.to,
        };

        await this.Redis.connection
            .lpush(this.extendKey(message.protocol), JSON.stringify(data));
    }

    public async collect(): Promise<MessageModel[][]> {
        const keys = await this.getKeys();
        const historysKeys = await this.addLength(keys);
        const historys = await this.getHistory(historysKeys);
        const messageHistory = await this.parseMessages(historys);

        return messageHistory;
    }

    private getKeys(): Promise<string[]> {
        return this.Redis.connection.keys(`${this.key}*`);
    }

    private async addLength(keys: string[]): Promise<HistoryKeys[]> {
        const lengthPromisses = keys.map(async (key: string): Promise<HistoryKeys> => {
            const size: number = await this.Redis.connection.llen(key);
            return { key, size, trim: size + 1 };
        });

        const list: HistoryKeys[] = await Promise.all(lengthPromisses);

        return list;
    }

    private async getHistory(keys: HistoryKeys[]): Promise<any> {
        const historyPromisses = keys.map(async (data: HistoryKeys): Promise<string[][]> => {
            return await this.Redis.connection
                .multi()
                .lrange(data.key, 0, data.size)
                .llen(data.key)
                .ltrim(data.key, data.trim, -1)
                .exec()
                .then((result) => result[0][1]);
        });

        return await Promise.all(historyPromisses);
    }

    private async parseMessages(historys: string[][]): Promise<MessageModel[][]> {
        const messagesPromisse = historys.map(async (history: string[]): Promise<MessageModel[]> => {
            return history.map((message: string): MessageModel => JSON.parse(message));
        });

        const list = await Promise.all(messagesPromisse);

        return list;
    }
}

export default MessageStorage;