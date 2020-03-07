import AbstractJob from './AbstractJob';
import MessagesModel, { MessageModel as IModel } from '../models/Message';
import MessageStorage from '../models/Redis/MessageStorage';

class MessageJob extends AbstractJob {
    constructor() {
        super('Message');
    }

    public async start() {
        const Model = new MessagesModel();
        const Storage = new MessageStorage();
        setInterval(async () => {
           try {
                const collection = await Storage.collect();
                await Promise.all(collection.map(async (messages: IModel[]) => {
                    await Model.create(messages);
                }));
                this.logInfo();
           } catch (error) {
               this.logFail(error);
           }
        }, this.timeHandle.toMS(this.config.MESSAGE.interval));
    }
}

export default MessageJob;