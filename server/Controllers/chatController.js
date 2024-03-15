import expressAsyncHandler from "express-async-handler";
import Chat from "../Models/chatModel.js"
import User from "../Models/userModel.js"
import { FetchingChatError } from "../CustomErrors/CustomErrors.js";

export const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    console.log("access chat controller", userId);

    if (!userId) {
        console.log("UserId param not sent");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name username email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).json(fullChat);
        } catch (error) {
            res.status(400);
            throw new FetchingChatError(error.message);
        }
    }
});

export const fetchChats = expressAsyncHandler(async (req, res) => {
    console.log("fetch chat controller");

    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ upadatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name username email"
                });
            });

        res.status(200).json(chats);

    } catch (error) {
        res.status(400);
        throw new FetchingChatError(error.message);
    }
});