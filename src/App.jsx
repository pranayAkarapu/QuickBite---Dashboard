import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import LandingPage from './VendorDashboard/Pages/LandingPage'
import NotFound from './VendorDashboard/components/Forms/NotFound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
