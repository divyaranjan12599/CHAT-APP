import { model, Schema } from "mongoose";

const messageModel = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
}, { timeStamp: true });

const Message = model("Message", messageModel);
export default Message;

