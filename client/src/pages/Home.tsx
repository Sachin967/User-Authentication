import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, useNavigate } from 'react-router-dom'
import users from '../axios'
import { AuthActions } from '../store/Authslice'
import { toast } from 'react-toastify'

const Home: React.FC = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { Userisloggedin, userdetails } = useSelector((state: RootState) => state.auth)

     const handleLogout = () => {
          users.post('/signout')
               .then((res) => {
                    if (res.status) {
                         dispatch(AuthActions.UserLogout())
                         navigate('/login')
                    }
               })
               .catch((err) => {
                    toast.error(err.message)
               })
     }
     return Userisloggedin ? (
          <div className="py-5">
               <div className="flex justify-center">
                    <div className="p-5 text-white flex flex-col items-center bg-[#3A244A] w-10/12">
                         <h1 className="text-3xl  font-bold p-4">
                              Welcome {userdetails?.firstname} {userdetails?.lastname}
                         </h1>
                         <p className="text-center mb-4">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sit, voluptatibus
                              aspernatur nesciunt iusto perferendis inventore, consequuntur sed assumenda minima libero,
                              architecto aperiam veniam doloremque!
                         </p>
                         <button onClick={handleLogout} className="bg-[#D72638] text-white p-2 rounded-lg">
                              Logout
                         </button>
                    </div>
               </div>
          </div>
     ) : (
          <Navigate to="/login" replace />
     )
}
export default Home
