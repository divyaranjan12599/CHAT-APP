import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material'
import { AnimatePresence, motion } from "framer-motion"

const CreateGroup = () => {
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
                <input type="text" placeholder='Enter group name' className='searchbox' />
                <IconButton>
                    <DoneIcon />
                </IconButton>
            </motion.div>
        </AnimatePresence>
    )
}

export default CreateGroup