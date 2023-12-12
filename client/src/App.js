import React from "react";
import { GoogleOAuthProvider} from '@react-oauth/google';

import { Container } from '@material-ui/core';
import { ToastProvider } from "./components/Providers/ToastProvider.js";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
import dotenv from 'dotenv';

const App = () => {

   dotenv.config();
   
   return (
<GoogleOAuthProvider clientId={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}`}>
<BrowserRouter> 
   <Container maxwidth="lg">
      <ToastProvider>
        <Navbar/>
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/auth" exact element={<Auth/>} />

        </Routes>
      </ToastProvider>
   </Container>
</BrowserRouter>
</GoogleOAuthProvider>
    );
}
export default App;