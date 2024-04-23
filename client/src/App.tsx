import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import VerifyOtp from './pages/VerifyOtp'
function App() {
     return (
          <>
               <div className="bg-[#FFFFFF]">
                    <ToastContainer />
                    <BrowserRouter>
                         <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<SignUp />} />
                              <Route path='/verifyemail/:id' element={<VerifyOtp/>}/>
                              <Route path='/' element={<Home/>}/>
                         </Routes>
                    </BrowserRouter>
               </div>
          </>
     )
}

export default App
