import React, { useEffect } from 'react'
import "./myStyle.css"
import { useNavigate } from 'react-router-dom'

const ConversationItem = (props) => {
  const navigate = useNavigate();
  // console.log("conversation item...",props);
  return (
    !props.data ?
      <>
        <br />
        <p>No conversation till now...</p>
      </>
      :
      <div className='conv-container' onClick={() => {
        // console.log("conversation item clicked: ", props.data);
        navigate(
          "chat/" +
          props.data._id +
          "&" +
          props.data.users[1].name +
          "&" +
          props.data.users[1].username
        );
      }}>
        <div className='conv-icon'>
          {props.chatName[0]}
          {/* <AccountCircleOutlinedIcon className='isss'/> */}
        </div>
        <div className={'conv-title'}>
          {props.chatName}
        </div>
        <div className='conv-lastmessage'>
          {(!props.data.latestMessage) ? "No previous messages, Click here to start a new chat" : props.data.latestMessage.content}
        </div>
        <div className={"conv-timestamp"}>
          {/* {props.data.timeStamp} */}
          today
        </div>
      </div>
  )
}

export default ConversationItem