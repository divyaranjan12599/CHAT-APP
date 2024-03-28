import React from 'react'

const MessageOther = (props) => {
    // const data = {
    //     name: "RandomUser",
    //     message: "Something",

    // }
    return (
        <div className={'other-mess-container'}>
            <p className='conv-icon'>{props.message.sender.name[0]}</p>
            <div className={'other-text-content'+(!props.nightMode ? "" : " other-chat-dark")}>
                <p className='conv-title'>{props.message.sender.name}</p>
                <p className='conv-lastmessage'>{props.message.content}</p>
                <p className='chat-timestamp'>12:00</p>
            </div>
        </div>
    )
}

export default MessageOther