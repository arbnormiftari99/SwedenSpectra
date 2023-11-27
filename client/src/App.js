import React from "react";
import { Container } from '@material-ui/core';
import { ToastProvider } from "./components/Providers/ToastProvider.js";
import { BrowserRouter, Routes, Route} from 'react-router-dom';


import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";
import Auth from "./components/Auth/Auth.js";
const App = () => {
   
   return (

    
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
    );
}
export default App;