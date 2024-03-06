import React from 'react'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { AnimatePresence, motion } from "framer-motion"

const OnlineUsers = (props) => {
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
            <p>Online Users</p>
          </div>
          <div className={'sb-search' + (!props.nightMode ? "" : " other-chat-dark")}>
            <IconButton className={(!props.nightMode ? "" : " other-chat-dark")}>
              <SearchOutlinedIcon />
            </IconButton>
            <input placeholder='Search' className={'searchbox' + (!props.nightMode ? "" : " other-chat-dark")} />
          </div>
        </div>

        <div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>Test1</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>Test1</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>Test1</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={'list-item' + (!props.nightMode ? "" : " dark")}>
            <p className='conv-icon'>T</p>
            <p className='conv-title'>Test1</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OnlineUsers