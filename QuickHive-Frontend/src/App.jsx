import AddNewEvent from './components/AddNewEvent'
import AllEvents from './components/AllEvent'
import './index.css'
import Login from './Auth/Login'
import SignUp from './Auth/Signup'
import Stats from './components/Stats'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Testimonials from './components/Testimonials'
import ScrollEffects from './components/ScrollEffects'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={
            <>
              <ScrollEffects/>
              <Carousel/>
              <Stats/>
              <Testimonials/>
            </>
          }/>

          <Route path='/createEvent' element={<AddNewEvent/>}/>
          <Route path='/events' element={<AllEvents/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
