import React, { useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../features/themeSlice'
import { store } from '../features/store'
import axios from "axios";
// import themeSliceReducer from '../features/themeSlice.js';

const Sidebar = () => {
    const nightMode = useSelector(state => state.themeKey);
    // console.log(store.getState(), nightMode);
    const [conversations, setConversations] = useState([])
    // store.dispatch({ type: 'theme/toggle' })
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    
    useEffect(() => {
        if(!userData){
            console.log("User not Authenticated");
            navigate("/login");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };

        axios.get("/api/chat/", config)
        .then((res)=>{
            // console.log("chat api:",res.data);
            if(res.data) setConversations(res.data);
        });

        // return () => {
        //     cleanup
        // }
    }, [])
    // const dispatch = useDispatch();

    // console.log(toggleTheme());
    // const newState = themeSliceReducer(
    //     { payload: false },
    //     { type: 'themeSlice/toggleTheme', payload: undefined }
    // )
    // console.log(newState);
    // const [nightMode, setNightMode] = useState(false);

    return (
        <div className='sidebar-container'>
            <div className={"sb-header" + (!nightMode ? "" : " dark")}>
                <div>
                    <IconButton className={(!nightMode ? "" : "dark")} onClick={() => { navigate("") }}>
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </div>
                <div className='sidebar-header-icons'>
                    <IconButton className={(!nightMode ? "" : "dark")} onClick={() => { navigate("users") }}>
                        <PersonAddAltOutlinedIcon />
                    </IconButton>
                    <IconButton className={(!nightMode ? "" : "dark")} onClick={() => { navigate("groups") }}>
                        <GroupAddOutlinedIcon />
                    </IconButton>
                    <IconButton className={(!nightMode ? "" : "dark")} onClick={() => { navigate("create-group") }}>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton className={(!nightMode ? "" : "dark")} onClick={() => { store.dispatch(toggleTheme()) }}>
                        {!nightMode ? (<DarkModeOutlinedIcon />) : (<LightModeOutlinedIcon />)}
                    </IconButton>
                </div>
            </div>
            <div className={'sb-search' + (!nightMode ? "" : " dark")}>
                <IconButton className={(!nightMode ? "" : "dark")}
                // onClick={() => { navigate("online-users") }}
                >
                    <SearchOutlinedIcon />
                </IconButton>
                <input placeholder='Search' className={'searchbox' + (!nightMode ? "" : " dark")} />
            </div>
            <div className={'sb-conversation' + (!nightMode ? "" : " dark")}>
                {
                    conversations.length === 0 ? <ConversationItem nightMode={nightMode} /> : conversations.map((conversation, index) => {
                        // console.log(conversation, index);
                        let chatName = "";
                        let username = "";
                        if(conversation.isGroupChat){
                            chatName = conversation.chatName;
                        }
                        else {
                            conversation.users.map((user)=>{
                                if(user._id != userData.data._id){
                                    chatName = user.name;
                                    username = user.username;
                                }
                            })
                        }

                        return <ConversationItem data={conversation} chatName={chatName} key={index} nightMode={nightMode} />
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar