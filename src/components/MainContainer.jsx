import React from 'react'
import './myStyle.css'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import { useState } from 'react'
import Welcome from './Welcome'
import CreateGroup from './CreateGroup'
import OnlineUsers from './OnlineUsers'
import { Outlet } from "react-router-dom"

const MainContainer = () => {

  return (
    <div className='main-container'>
      <Sidebar />
      <Outlet />
      {/* <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default MainContainer