import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/Forms/Login'
import Register from '../components/Forms/Register'
import AddFirm from '../components/Forms/AddFirm'
import AddProduct from '../components/Forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import { useState, useEffect } from 'react'

const LandingPage = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(true);

  /*useEffect(()=>{
    const loginToken = localStorage.getItem("loginToken");
    if(loginToken){
      setShowLogout(true);
    }
  });

  useEffect(()=>{
    const firmName = localStorage.getItem("firmName");
    if(firmName){
      setShowAddFirm(false);
    }
  },[]);*/

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogout(true);
    }

    const firmName = localStorage.getItem("firmName");
    if (!firmName) {
      setShowAddFirm(true);
    } else {
      setShowAddFirm(false);
    }

    const showWelcomeFlag = localStorage.getItem("showWelcome");
    if (showWelcomeFlag === "true") {
      setShowWelcome(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowAllProducts(false);
      localStorage.removeItem("showWelcome");
    }
  }, []);


  const handleLogout = ()=>{
    confirm("Are you sure to logout?")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogout(false);
    setShowWelcome(false);
    setShowAddFirm(true);
    setShowLogin(true);
  }

  function handleLogin(){
    setShowFirm(false)
    setShowRegister(false);
    setShowProduct(false);
    //setShowWelcome(false);
    setShowAllProducts(false);
    setShowLogin(true);
  }

  function handleRegister(){
    setShowFirm(false)
    setShowLogin(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowRegister(true);
  }

  function handleFirm(){
    if(showLogout){
      setShowLogin(false);
      setShowRegister(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowFirm(true);
    }else{
      alert("Please Login");
      setShowLogin(true);
      setShowRegister(false);
    }
    
  }

  function handleProduct(){
    if(showLogout){
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowProduct(true);
    }else{
      alert("Please Login");
      setShowLogin(true);
      setShowRegister(false);
    }
    
  }

  function handleWelcome(){
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
    setShowWelcome(true);
  }

  function HandleAllProducts(){
    if(showLogout){
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    }else{
      alert("Please Login");
      setShowLogin(true);
      setShowRegister(false)
    }
  }

  return (
    <>
        <section className='landingsection'>
            <NavBar LoginHandler={handleLogin} registerHandler={handleRegister} showlogout = {showLogout} logouthandler = {handleLogout}/>
            <div className="collectionsection">
              <SideBar firmHandler={handleFirm} productHandler={handleProduct} allproducts={HandleAllProducts} firmtitle={showAddFirm}/>
              {showLogin && <Login WelcomeHandler={handleWelcome}/>}
              {showRegister && <Register LoginHandler={handleLogin}/>}
              {showFirm && showLogout && <AddFirm/>}
              {showProduct && showLogout && <AddProduct/>}
              {showWelcome && <Welcome/>}
              {showAllProducts && showLogout && <AllProducts/>}
            </div>
            
        </section>
    </>
  )
}

export default LandingPage
