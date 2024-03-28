import { useState } from 'react'
import './App.css'
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from './components/Welcome'
import CreateGroup from './components/CreateGroup'
import ChatArea from './components/ChatArea'
import Groups from './components/Groups'
import { useSelector, useDispatch } from 'react-redux'
// import { toggleTheme } from './features/themeSlice'
// import { store } from './features/store'
// import CircularProgress from '@mui/material/CircularProgress';
import Signup from './components/Signup'
import Users from './components/Users'

function App() {
  const nightMode = useSelector(state => state.themeKey);

  return (
    <>
      <div className={"app"+(!nightMode ? "" : " dark")}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContainer nightMode={nightMode} />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/create-group" element={<CreateGroup nightMode={nightMode}/>} />
              <Route path="/chat/:_id" element={<ChatArea nightMode={nightMode}/>} />
              <Route path="/users" element={<Users nightMode={nightMode}/>} />
              <Route path="/groups" element={<Groups nightMode={nightMode}/>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
