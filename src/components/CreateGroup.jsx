import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material'

const CreateGroup = () => {
    return (
        <div className='create-group-container'>
            <input type="text" placeholder='Enter group name' className='searchbox' />
            <IconButton>
                <DoneIcon />
            </IconButton>
        </div>
    )
}

export default CreateGroup