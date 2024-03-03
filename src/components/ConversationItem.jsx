import React from 'react'
import "./myStyle.css"
import { useNavigate } from 'react-router-dom'

const ConversationItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className='conv-container' onClick={()=>{navigate("chat")}}>
      <div className='conv-icon'>
        {props.data.name[0]}
        {/* <AccountCircleOutlinedIcon className='isss'/> */}
      </div>
      <div className='conv-title'>
        {props.data.name}
      </div>
      <div className='conv-lastmessage'>
        {props.data.lastMessage}
      </div>
      <div className="conv-timestamp">
        {props.data.timeStamp}
      </div>
    </div>
  )
}

export default ConversationItem