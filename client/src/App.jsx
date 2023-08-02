import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast'
import Dashboard from './components/Dashboard'
import ForgotPassword from './components/Forgotpassword'
import Newpassword from './components/Newpassword'

function App() {

  return (
    <>
    <Router>
      <Toaster  position='top-center' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/signup' element={<SignUp/>} />  
        <Route path='/' element={<Home/>} />  
        <Route path='/signin' element={<SignIn/>} />  
        <Route path='/dashboard' element={<Dashboard/>} />  
        <Route path='/forgotpassword' element={<ForgotPassword /> } /> 
        <Route path='/newpassword' element={<Newpassword /> } /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
