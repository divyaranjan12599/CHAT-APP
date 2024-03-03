import React from 'react'

const MessageSelf = () => {
    const data = {
        name: "You",
        message: "Something self bjhhjhj jhjjhhj hjhj asdfghj sdfg werty rtyu fhgjkl dfgh fgh.",

    }
    return (
        <div className='self-mess-container'>
            <div className='messagebox'>
                {/* <p className='conv-title'>{data.name}</p> */}
                <p className='conv-lastmessage'>{data.message}</p>
                <p className='chat-timestamp'>12:00</p>
            </div>
        </div>

    )
}

export default MessageSelf