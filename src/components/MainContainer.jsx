import React from 'react'
import './myStyle.css'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom"

const MainContainer = (props) => {

  return (
    <div className={'main-container' + (!props.nightMode ? "" : " dark-container")}>
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