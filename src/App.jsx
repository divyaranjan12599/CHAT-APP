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

function App() {
  const [count, setCount] = useState(0)
  const [conversation, setConversation] = useState(
    {
      name: "test1",
      messages: [],
      timeStamp: "today"
    });

  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContainer />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/chat" element={<ChatArea data={conversation} />} />
              <Route path="/online-users" element={<OnlineUsers />} />
              <Route path="/groups" element={<Groups />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
