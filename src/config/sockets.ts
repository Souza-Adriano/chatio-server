import { UserChat, CustomerChat } from '../services/chat/Chat';
import { Manager, Queue } from '../services/attendence/Attendence';
import SocketController from '../controllers/SocketController';

export default {
    user: [ SocketController, UserChat, Manager ],
    customer: [ SocketController, CustomerChat, Queue ],
};