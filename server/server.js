import express from "express";
import mongoose from 'mongoose';
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import groupRoutes from "./Routes/groupRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import errorHandler from "./CustomErrors/ErrorHandler.js";
import cors from 'cors';
import { Server } from "socket.io";

// import dotenv from 'dotenv'
// dotenv.config()

const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin: "http://localhost:5173/"
}));

app.use(express.json());



app.get("/", (req, res) => {
    res.json({
        msg: "Welllcooome...."
    });
})

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/group", groupRoutes);
app.use("/message", messageRoutes);


app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI);
        console.log("Db connected...");
    } catch (error) {
        console.log("Db is not connected!!!");
    }
}

connectDb();

// listen for requests
const server = app.listen(port, () => {
    console.log("listening on port", port);
})

const io = new Server(server, {
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
});

io.on("connection", (socket) => {
    socket.on("setup", (user) => {
        socket.join(user.data._id);
        console.log("socket connected: ", user);
        socket.emit("connected");
    });

    socket.on("join_chat", (room) => {
        socket.join(room);
    });

    socket.on("new_message", (newMessageStatus) => {
        let chat = newMessageStatus.chat;
        // console.log("new message --------------------- =====================",newMessageStatus);
        if(!chat.users){
            return ;
        }
        chat.users.forEach(user => {
            console.log("chat re", user);
            if (user._id === newMessageStatus.sender._id) {
                return ;
            }
            
            socket.emit("message_received", newMessageStatus);
        });
    });
});