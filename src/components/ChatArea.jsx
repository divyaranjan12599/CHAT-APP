import React from 'react'
import "./myStyle.css"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';

const ChatArea = (props) => {
    return (
        <div className='chat-container'>
            <div className='chat-header '>
                <p className='conv-icon'>{props.data.name[0]}</p>
                <div className='header-text'>
                    <p className='conv-title'>{props.data.name}</p>
                    <p className='conv-timestamp'>{props.data.timeStamp}</p>
                </div>
                <IconButton>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </div>
            <div className='mess-container '>
                <MessageOther/>
                <MessageSelf/>
                <MessageOther/>
                <MessageSelf/>
                <MessageOther/>
                <MessageSelf/>
                <MessageOther/>
                <MessageSelf/>
            </div>
            <div className='chat-input '>
                <input type="text" placeholder='Type a message...' className='searchbox' />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatArea