import React, { useEffect, useRef, useState } from 'react'
import "./myStyle.css"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { AnimatePresence, motion } from "framer-motion"
import { sendMessage } from '../../server/Controllers/messageController';
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

// const socket = io("ws://example.com/my-namespace", {
//   reconnectionDelayMax: 10000,
//   auth: {
//     token: "123"
//   },
//   query: {
//     "my-key": "my-value"
//   }
// });

const ChatArea = (props) => {
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
    const [message, setmessage] = useState("");
    const [refresh, setrefresh] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const messagesEndRef = useRef(null);
    const dyParams = useParams();
    const [chat_id, chat_user, username] = dyParams._id.split("&");
    const [allMessages, setAllMessages] = useState([]);
    const [loaded, setloaded] = useState(false);
    const socket = io(ENDPOINT);

    const sendMessage = async () => {
        if (!userData) {
            console.log("User not Authenticated");
            navigate("/login");
        }
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        const res = await axios.post(
            "/api/message/",
            {
                content: message,
                chatId: chat_id,
            },
            config
        )

        console.log("Message fired!!!", res.data);
        socket.emit("new_message", res.data);
    }

    useEffect(() => {
        // socket = io(ENDPOINT);
        socket.emit("setup", userData);
        socket.on("connection", () => {
            setSocketConnectionStatus(!socketConnectionStatus)
        });
    }, []);

    useEffect(() => {
        console.log("Users refreshed");
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        axios
            .get("/api/message/" + chat_id, config)
            .then(({ data }) => {
                setAllMessages(data);
                setloaded(true);
                socket.emit("join_chat", chat_id);
                // console.log("Data from Acess Chat API ");
            });
        // scrollToBottom();
    }, [refresh, chat_id, userData.data.token]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.3",
                }}
                className={'chat-container'}>
                <div className={'chat-header' + (!props.nightMode ? "" : " dark")}>
                    <p className='conv-icon'>{chat_user[0]}</p>
                    <div className={'header-text'}>
                        <div style={{ display: "flex", flexDirection: "row" }}><p className='conv-title'>{chat_user} </p> &nbsp; @{username} </div>
                        <p className={'conv-timestamp' + (!props.nightMode ? "" : " dark")}>today</p>
                    </div>
                    <IconButton className={(!props.nightMode ? "" : "dark")}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </div>
                <div className={'mess-container' + (!props.nightMode ? "" : " dark")}>
                    {allMessages.length !== 0 ?
                        allMessages
                            .slice(0)
                            // .reverse()
                            .map((message, index) => {
                                const sender = message.sender;
                                const self_id = userData.data._id;
                                if (sender._id === self_id) {
                                    // console.log("I sent it ");
                                    return <MessageSelf message={message} nightMode={props.nightMode} key={index} />;
                                } else {
                                    // console.log("Someone Sent it");
                                    return <MessageOther message={message} nightMode={props.nightMode} key={index} />;
                                }
                            })
                        : (<p> No messages...</p>)
                    }
                </div>
                <div className={'chat-input' + (!props.nightMode ? "" : " dark")}>
                    <input type="text" value={message}
                        onChange={(e) => { setmessage(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.code == "Enter") {
                                sendMessage();
                                setmessage("");
                                setrefresh(!refresh);
                            }
                        }}
                        placeholder='Type a message...'
                        className={'searchbox' + (!props.nightMode ? "" : " dark")} />
                    <IconButton onClick={() => {
                        sendMessage();
                        setmessage("");
                        setrefresh(!refresh);
                    }} className={(!props.nightMode ? "" : " dark")}>
                        <SendIcon />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatArea