import React, { useEffect } from 'react'
import "./myStyle.css"
import { useNavigate } from 'react-router-dom'

const ConversationItem = (props) => {
  const navigate = useNavigate();
  
  return (
    !props.data ?
      <>
        <br />
        <p>No conversation till now...</p>
      </>
      :
      <div className='conv-container' onClick={() => { navigate("chat/" + props.data._id + "&" + chatName) }}>
        <div className='conv-icon'>
          {props.chatName[0]}
          {/* <AccountCircleOutlinedIcon className='isss'/> */}
        </div>
        <div className={'conv-title'}>
          {props.chatName}
        </div>
        <div className='conv-lastmessage'>
          {(props.data.latestMessage === undefined) ? "No previous messages, Click here to start a new chat" : props.data.lastMessage.messages}
        </div>
        <div className={"conv-timestamp"}>
          {props.data.timeStamp}
        </div>
      </div>
  )
}

export default ConversationItem