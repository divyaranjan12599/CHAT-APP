import React from 'react'
import "./myStyle.css"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { AnimatePresence, motion } from "framer-motion"

const ChatArea = (props) => {
    // console.log(props.nightMode);
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
                    <p className='conv-icon'>{props.data.name[0]}</p>
                    <div className={'header-text'}>
                        <p className='conv-title'>{props.data.name}</p>
                        <p className={'conv-timestamp' + (!props.nightMode ? "" : " dark")}>{props.data.timeStamp}</p>
                    </div>
                    <IconButton className={(!props.nightMode ? "" : "dark")}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </div>
                <div className={'mess-container' + (!props.nightMode ? "" : " dark")}>
                    <MessageOther nightMode={props.nightMode} />
                    <MessageSelf nightMode={props.nightMode} />
                    <MessageOther nightMode={props.nightMode} />
                    <MessageSelf nightMode={props.nightMode} />
                    <MessageOther nightMode={props.nightMode} />
                    <MessageSelf nightMode={props.nightMode} />
                    <MessageOther nightMode={props.nightMode} />
                    <MessageSelf nightMode={props.nightMode} />
                </div>
                <div className={'chat-input' + (!props.nightMode ? "" : " dark")}>
                    <input type="text" placeholder='Type a message...' className={'searchbox' + (!props.nightMode ? "" : " dark")} />
                    <IconButton className={(!props.nightMode ? "" : " dark")}>
                        <SendIcon />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatArea