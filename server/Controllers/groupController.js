import expressAsyncHandler from "express-async-handler";
import Chat from "../Models/chatModel.js"
import User from "../Models/userModel.js"
import { FetchingChatError } from "../CustomErrors/CustomErrors.js";

export const createGroup = expressAsyncHandler(async (req, res) => {
    console.log("create group controller", req.body);
    
    if (!req.body.users || !req.body.groupName) {
        return res.status(400).send({ message: "Required data not provided!!!" });
    }

    var users = JSON.parse(req.body.users);
    console.log("createGroup: ", req);
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.groupName,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

    } catch (error) {
        res.status(400);
        throw new FetchingChatError(error.message);
    }
});

export const fetchGroups = expressAsyncHandler(async (req, res) => {
    console.log("fetch group controller");
    
    try {
        const allGroups = await Chat.where("isGroupChat").equals(true);
        res.status(200).send(allGroups);
    } catch (error) {
        res.status(400);
        throw new FetchingChatError(error.message);
    }
});

export const groupExit = expressAsyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    console.log("group exit controller", chatId, userId);
    const removed = await Chat.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new FetchingChatError(error.message);
    }
    else {
        res.json(removed);
    }
});