import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import ChatWindow from './Components/ChatWindow'
import PageNotFound from './Components/PageNotFound'
import Profile from './Components/Profile'
import Home from './Components/Home'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* This will match with /uniqueChat/anytext */}
        <Route path="/uniqueChat/:ID" element={<ChatWindow />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
