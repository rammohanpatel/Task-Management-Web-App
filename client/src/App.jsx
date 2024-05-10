import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from './components/Home';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx'; 
import Task from './components/Task.jsx';
import {Toaster} from 'react-hot-toast'


const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
