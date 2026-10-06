import React from 'react'
import {Navigate , BrowserRouter , Route ,Routes} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx"
import Income from "./pages/Income.jsx"
import Expense from './pages/Expense';
import Category from './pages/Category';
import Filter from './pages/Filter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import AppBackground from './components/AppBackground.jsx';


const App = () => {
  return (
    <>
    <Toaster />
    <BrowserRouter>
     <AppBackground>
      <Routes>
          <Route path='/' element={<Root/>} />
          <Route path='/home' element={<LandingPage/>}/>
          <Route path='/dashboard' element={<Home/>} />
          <Route path='/income' element={<Income/>} />
          <Route path='/expense' element={<Expense/>} />
          <Route path='/category' element={<Category/>} />
          <Route path='/filter' element={<Filter/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          
      </Routes>
      </AppBackground>
    </BrowserRouter>
    </>
    
  )
}

const Root = ()=> {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (<Navigate to="/login"></Navigate>)
}

export default App