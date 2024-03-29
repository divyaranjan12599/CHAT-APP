import expressAsyncHandler from "express-async-handler";
import Message from "../Models/messageModel.js"
import User from "../Models/userModel.js"
import Chat from "../Models/chatModel.js"

export const allMessages = expressAsyncHandler(async (req, res) => {
    console.log("all messages controller...");
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name email")
            .populate("reciever")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const sendMessage = expressAsyncHandler(async (req, res) => {
    console.log("send message controller");
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await message.populate("reciever");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email",
        });
        
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        // console.log("send message ------------------------ =============================",message);
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});