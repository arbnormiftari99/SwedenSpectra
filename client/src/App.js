import React, {useState, useEffect} from "react";
import { GoogleOAuthProvider} from '@react-oauth/google';


import { Container } from '@material-ui/core';
import { ToastProvider } from "./components/Providers/ToastProvider.js";
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

import PostDetails from "./components/PostDetails/PostDetails.jsx";
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
import dotenv from 'dotenv';

const App = () => {
   dotenv.config();
   const user = JSON.parse(localStorage.getItem('profile'));
   const navigate = useNavigate();

   

   
   return (
   
<GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
   <Container maxwidth="xl">
      <ToastProvider>
        <Navbar/>
        <Routes>
            <Route path="/" exact element={<Navigate to="/posts" /> } />
            <Route path="/posts" exact element={<Home/>} />
            <Route path="/posts/search" exact element={<Home/>} />
            <Route path="/posts/:id" exact element={<PostDetails/>} />
            <Route path="/auth"  exact element={(!user ? <Auth /> : <Navigate to="/posts" />)} />

        </Routes>
      </ToastProvider>
   </Container>

</GoogleOAuthProvider>
   )
}
export default App;