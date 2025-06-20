import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import ChatWindow from './Components/ChatWindow'
import { Navigate } from 'react-router-dom'
import Protected_Route from './Components/ProtectedRoute'

function RoutingApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Protected_Route>
          <Home></Home>
        </Protected_Route>}></Route>
        <Route path="/:ID" element={<Protected_Route>
          <Home></Home>
        </Protected_Route>}></Route>
        <Route path="/login" element={<Login ></Login>} />
      </Routes>
    </>

  )
}

export default RoutingApp