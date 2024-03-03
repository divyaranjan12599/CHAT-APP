import React from 'react'
import "./myStyle.css"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ConversationItem from './ConversationItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const [nightMode, setNightMode] = useState(false);
    const [conversations, setConversations] = useState([
        {
            name: "Test1",
            lastMessage: "LastMessage1",
            timeStamp: "today"
        },
        {
            name: "Test2",
            lastMessage: "LastMessage2",
            timeStamp: "today"
        },
        {
            name: "Test3",
            lastMessage: "LastMessage3",
            timeStamp: "today"
        }
    ])

    const navigate = useNavigate();

    return (
        <div className='sidebar-container'>
            <div className={"sb-header" + (!nightMode?"":" dark")}>
                <div>
                    <IconButton className={(!nightMode?"":" dark")} onClick={() => { navigate("") }}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton className={(!nightMode?"":" dark")} onClick={() => { navigate("online-users") }}>
                        <PersonAddAltOutlinedIcon />
                    </IconButton>
                    <IconButton className={(!nightMode?"":" dark")} onClick={() => { navigate("groups") }}>
                        <GroupAddOutlinedIcon />
                    </IconButton>
                    <IconButton className={(!nightMode?"":" dark")} onClick={() => { navigate("create-group") }}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                    {!nightMode?(<IconButton className={(!nightMode?"":" dark")} onClick={() => { setNightMode(true) }}>
                        <DarkModeOutlinedIcon />
                    </IconButton>):
                    (<IconButton className={(!nightMode?"":" dark")} onClick={() => { setNightMode(false) }}>
                        <LightModeOutlinedIcon />
                    </IconButton>)}
                </div>
            </div>
            <div className='sb-search'>
                <IconButton className={(!nightMode?"":" dark")} 
                // onClick={() => { navigate("online-users") }}
                >
                    <SearchOutlinedIcon />
                </IconButton>
                <input placeholder='Search' className='searchbox' />
            </div>
            <div className='sb-conversation'>
                {
                    conversations.map((conversation, index) => {
                        // console.log(conversation, index);
                        return <ConversationItem data={conversation} key={index}/>
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar