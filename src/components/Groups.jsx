import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Groups = (props) => {

  const [groups, setGroups] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("Data from LocalStorage : ", userData);
  const nav = useNavigate();
  
  useEffect(() => {
    if (!userData) {
      console.log("User not Authenticated");
      nav("/");
    }
    const user = userData.data;
    console.log("Users refreshed : ", user.token);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get("api/group/fetchGroups", config)
      .then((response) => {
        console.log("Group Data from API ", response.data);
        setGroups(response.data);
      });
  }, [refresh]);



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
        className={'online-container'}>
        <div className={'sb-header' + (!props.nightMode ? "" : " dark")}>
          <div className='online-header'>
            <img className="online-logo" src="lets-chat-favicon-color (1).png" alt="logo" />
            <p>Available Groups</p>
          </div>
          <div className={'sb-search' + (!props.nightMode ? "" : " other-chat-dark")}>
            <IconButton className={(!props.nightMode ? "" : " other-chat-dark")}>
              <SearchOutlinedIcon />
            </IconButton>
            <input placeholder='Search' className={'searchbox' + (!props.nightMode ? "" : " other-chat-dark")} />
          </div>
        </div>

        <div>
        {groups.map((group, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={"list-tem" + (lightTheme ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with group", group.name);
                  // const config = {
                  //   headers: {
                  //     Authorization: `Bearer ${userData.data.token}`,
                  //   },
                  // };
                  // axios.post(
                  //   "api/chat/",
                  //   {
                  //     userId: user._id,
                  //   },
                  //   config
                  // );
                  // dispatch(refreshSidebarFun());
                }}
              >
                <p className={"con-icon" + (lightTheme ? "" : " dark")}>T</p>
                <p className={"con-title" + (lightTheme ? "" : " dark")}>
                  {group.chatName}
                </p>
              </motion.div>
            );
          })}
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>GroupName1</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>GroupName1</p>
          </motion.div> */}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Groups