import { useState } from 'react'
import './App.css'
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from './components/Welcome'
import CreateGroup from './components/CreateGroup'
import ChatArea from './components/ChatArea'
import OnlineUsers from './components/OnlineUsers'
import Groups from './components/Groups'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from './features/themeSlice'
import { store } from './features/store'

function App() {
  const nightMode = useSelector(state => state.themeKey);
  const [conversation, setConversation] = useState(
    {
      name: "test1",
      messages: [],
      timeStamp: "today"
    });

  return (
    <>
      <div className={"app"+(!nightMode ? "" : " dark")}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContainer nightMode={nightMode} />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/create-group" element={<CreateGroup nightMode={nightMode}/>} />
              <Route path="/chat" element={<ChatArea data={conversation} nightMode={nightMode}/>} />
              <Route path="/online-users" element={<OnlineUsers nightMode={nightMode}/>} />
              <Route path="/groups" element={<Groups nightMode={nightMode}/>} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
