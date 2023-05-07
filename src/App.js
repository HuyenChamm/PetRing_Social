import React, { useEffect, useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Home from './Components/Home';
import ProfileUser from './Components/Profile/ProfileUser';
import ProfilePet from './Components/Profile/ProfilePet';
import Login from './Components/LoginRegister/Login';
import Register from './Components/LoginRegister/Register';
import Chat from './Components/Chat/Chat';
import ListFriend from './Components/Friend/ListFriend';
// import Custom from './Components/Custom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Connect from './Components/Connect';
import ListComment from './Components/Post/ListComment';
import Like from './Components/Post/Include Function/Like';

import Recommend from './Components/Friend/Recommend';
import EditProfileUser from './Components/Profile/Include Function/EditProfileUser';
import EditProfilePet from './Components/Profile/Include Function/EditProfilePet';
import ChangePass from './Components/Profile/Include Function/ChangePass';
import Slick from './Components/Layout/Slick';
// import apiGeneral from './api/apiGeneral';
import CheckLogin from './Components/LoginRegister/CheckLogin';
import { io } from "socket.io-client";

export const IsLoggedInContext = React.createContext(false)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie ? true : false)
  }, [])

  const handleLogout = () => {
    console.log("LOGOUT");
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false)
  }
    console.log("RENDER", isLoggedIn);
/////////////////////////
  
  const socket = io('http://localhost:4000');
  socket.on("connect", () =>{
    console.log("connect");
  }) 
  socket.on("disconnect",()=>{
    console.log("disconnect");
  })

/////////////////////////
  return (
    <div className="App">

    <Header isLoggedIn = {isLoggedIn} handleLogout={handleLogout} socket = {socket}/>
    <IsLoggedInContext.Provider value={isLoggedIn}>
    <Routes>
      <Route path='/' element={<Home isLoggedIn= {isLoggedIn}   socket = {socket} />}></Route>
      <Route path='/Login' element={<Login socket = {socket} />}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/ProfileUser' element={<ProfileUser isLoggedIn= {isLoggedIn}/>}></Route>
      <Route path='/ProfilePet' element={<ProfilePet isLoggedIn= {isLoggedIn}/>}></Route>
      <Route path='/Chat' element={<Chat/>}></Route>
      <Route path='/ListFriend' element={<ListFriend  isLoggedIn= {isLoggedIn}/>}></Route>
      {/* <Route path='/Custom' element={<Custom/>}></Route> */}
      <Route path='/Connect' element={<Connect/>}></Route>
      {/* <Route path='/Post' element={<Post isLoggedIn= {isLoggedIn} />}></Route> */}
      <Route path='/ListComment' element={<ListComment/>}></Route>
      <Route path='/Like' element={<Like/>}></Route>
     
      <Route path='/Recommend' element={<Recommend isLoggedIn= {isLoggedIn}/>}></Route>
      <Route path='/EditProfileUser' element={<EditProfileUser/>}></Route>
      <Route path='/EditProfilePet' element={<EditProfilePet/>}></Route>
      <Route path='/ChangePass' element={<ChangePass/>}></Route>
      <Route path='/Slick' element={<Slick/>}></Route>
      <Route path='/CheckLogin' element={<CheckLogin isLoggedIn=  {isLoggedIn} />}></Route>
    </Routes></IsLoggedInContext.Provider>
    <Footer/>
  </div>
  );
}

export default App;
