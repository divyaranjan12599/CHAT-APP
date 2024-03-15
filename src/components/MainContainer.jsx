import React from 'react'
import './myStyle.css'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const MainContainer = (props) => {

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (!userData) {
    console.log("User not Authenticated");
    navigate("/login");
  }

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