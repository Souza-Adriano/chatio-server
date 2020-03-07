import AbstractModel from './AbstractModel';

export interface MessageModel {
    id?: string;
    protocol: string;
    from: string;
    content: string;
    to: string;
}

class Message extends AbstractModel {
    constructor() {
        super();
    }

    public async create(list: MessageModel[]): Promise<void> {
        try {
            const messages = list.map((message: MessageModel): MessageModel => {
                return {
                    id: this.genID(),
                    ...message,
                };
            });

            await this.database('messages')
                .insert(messages);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Message;