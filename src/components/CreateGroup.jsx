import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material'
import { AnimatePresence, motion } from "framer-motion"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CreateGroup = () => {
    const [groupName, setgroupName] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
        console.log("User not Authenticated");
        navigate("/login");
    }

    const groupNameHandler = (e) => {
        setgroupName(e.target.value);
    }

    const createGroup = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.data.token}`,
            },
        };
        setloading(true);
        const res = await axios.post(
            "api/group/createGroup",
            {
                "groupName": groupName,
                "users": '[]'
            },
            config
        );

        console.log("create group", res);
        navigate("groups");
        setloading(false);
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    ease: "anticipate",
                    duration: "0.3",
                }} className={'create-group-container'}>
                <input type="text" onChange={groupNameHandler} value={groupName} placeholder='Enter group name' className='searchbox' />
                <IconButton onClick={createGroup}>
                    <DoneIcon />
                </IconButton>
            </motion.div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </AnimatePresence>
    )
}

export default CreateGroup