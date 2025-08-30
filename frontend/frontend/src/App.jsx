import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import StatsSection from "./components/Stats";

function App(){
return(
  <BrowserRouter>
  
  <Navbar/>
  <Routes>
    <Route path="/" element={
     <div>
      <Carousel/>
      <StatsSection/>
     </div>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App;
