import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";


function App(){
return(
  <BrowserRouter>
  
  <Navbar/>
  <Routes>
    <Route path="/" element={<Carousel/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App;