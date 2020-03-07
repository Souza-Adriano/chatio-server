import AbstractJob from './AbstractJob';
import MessagesModel, { MessageModel as IModel } from '../models/Message';
import MessageStorage from '../models/Redis/MessageStorage';

class MessageJob extends AbstractJob {
    constructor() {
        super('Message Store');
    }

    public async start() {
        if (this.config.MESSAGE.active === true) {
            const Model = new MessagesModel();
            const Storage = new MessageStorage();
            this.logStatusOn();

            setInterval(async () => {
                try {
                     const collection = await Storage.collect();
                     await Promise.all(collection.map(async (messages: IModel[]) => {
                         await Model.create(messages);
                     }));
                     this.logJob();
                } catch (error) {
                    this.logFail(error);
                }
             }, this.timeHandle.toMS(this.config.MESSAGE.interval));
        } else {
            this.logStatusOff();
        }
    }
}

export default MessageJob;