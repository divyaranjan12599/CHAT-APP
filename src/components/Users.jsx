import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AnimatePresence, motion } from "framer-motion"
import axios from 'axios';

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      console.log("User not authenticated");
      navigate(-1);
      return;
    }

    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        };

        const response = await axios.get("api/user/fetchusers", config);
        console.log("User data from API", response.data);
        setUsers(response.data);
      }
      catch (error) {
        console.error("Error fetching users:", error);
        // Handle error appropriately (e.g., display error message)
      }
    };

    fetchUsers();
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
        }} className='online-container'>
        <div className={'sb-header' + (!props.nightMode ? "" : " dark")}>
          <div className='online-header'>
            <img className="online-logo" src="lets-chat-favicon-color (1).png" alt="logo" />
            <p>Users</p>
          </div>
          <div className={'sb-search' + (!props.nightMode ? "" : " other-chat-dark")}>
            <IconButton className={(!props.nightMode ? "" : " other-chat-dark")}>
              <SearchOutlinedIcon />
            </IconButton>
            <input placeholder='Search' className={'searchbox' + (!props.nightMode ? "" : " other-chat-dark")} />
          </div>
        </div>

        <div>
          {users.map((user, index) => {
            return (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={'list-item' + (!props.nightMode ? "" : " dark")}
                key={index}
                onClick={() => {
                  console.log("Creating chat with ", user);
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.token}`,
                    },
                  };
                  axios.post(
                    "/api/chat/",
                    {
                      userId: user._id,
                    },
                    config
                  ).then(res => {
                    console.log("chat created: ", res);
                    navigate(
                      "/chat/" +
                      res.data._id +
                      "&" +
                      res.data.users[1].name + 
                      "&" +
                      res.data.users[1].username
                    );
                  }
                  );

                }}
              >
                <div>
                  <p className='conv-icon'>{user.name[0]}</p>
                </div>
                <div>
                  <p className='conv-title'>{user.name}</p>
                  <p>@{user.username}</p>
                </div>
              </motion.div>
            )
          })

          }
        </div>
      </motion.div >
    </AnimatePresence >
  )
}

export default Users