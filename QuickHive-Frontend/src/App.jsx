
import './index.css'
import Login from './Auth/Login'
import SignUp from './Auth/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import StatsSection from './components/Stats'
function App() {
return(
  <BrowserRouter>

  <Navbar/>
  <Routes>
<Route path='/' element={
  <div>
    <Carousel/>
    <StatsSection/>
  </div>
}/>
<Route path='/register' element={<SignUp/>}/>
<Route path='/login' element={<Login/>}/>
  </Routes>
  </BrowserRouter>
)
}

export default App
