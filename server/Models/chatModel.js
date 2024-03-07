import { model, Schema } from "mongoose";

const chatModel = new Schema({
    chatName: {
        type: String
    },
    isGroupChat: {
        type: Boolean
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timeStamp: true });

const Chat = model("Chat", chatModel);
export default Chat;