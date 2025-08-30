import AddNewEvent from './components/AddNewEvent'
import './App.css'
import Login from './Auth/Login'
import SignUp from './Auth/Sign-up'
function App() {

  return (
    <>
     <h1>QuickHive</h1>
     <Login />
     <SignUp />
     <AddNewEvent />
    </>
  )
}

export default App
