import React from 'react'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Groups = () => {
  return (
    <div className='online-container'>
      <div className='sb-header'>
        <div className='online-header'>
          <img className="online-logo" src="lets-chat-favicon-color (1).png" alt="logo" />
          <p>Available Groups</p>
        </div>
        <div className='sb-search '>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <input placeholder='Search' className='searchbox' />
        </div>
      </div>

      <div className='mess-container'>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
        <div className='list-item'>
          <p className='conv-icon'>T</p>
          <p className='conv-title'>GroupName1</p>
        </div>
      </div>
    </div>
  )
}

export default Groups