import { useState } from 'react'
import './App.css'
import Home from "./home/Home.jsx"
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Courses from './courses/Courses.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';


function App() {
  

  return (
  <>
   <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/course" element={<Courses />} />
           <Route path="/login" element={<Signup />} />
           <Route path="/register" element={<Signup />} />
          </Routes>

          <Toaster position="top-center" reverseOrder={false} />

  </>
  )
}

export default App
