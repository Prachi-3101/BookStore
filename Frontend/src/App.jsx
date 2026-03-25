import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Cards from './components/Cards'
import FreeBooks from './components/FreeBooks.jsx'

function App() {
  

  return (
    <>
    <Navbar />
    <Banner />
    <FreeBooks />
    <Footer />
    </>
  )
}

export default App
