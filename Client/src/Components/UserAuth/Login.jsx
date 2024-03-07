
import { Link } from 'react-router-dom';
import signuplogo from '../../assets/book.jpg'
import { FaEye } from "react-icons/fa";
import {useState,useEffect} from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../../AxiosInterceptor/userAxiosInterceptor'

import { useDispatch } from "react-redux";
import {  login } from "../../features/userSlice";
import { useNavigate } from 'react-router-dom';
import {
    GoogleOAuthProvider,
    GoogleLogin,
    
  } from "@react-oauth/google";

const Login = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [useremail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        const userData = localStorage.getItem("userData");
        const parseData = userData ? JSON.parse(userData) : null;
        if (parseData) {
          navigate("/");
        }else{
          navigate("/login");
    
        }
      }, [navigate]);
      const handleSubmit=async(e)=>{
        
        e.preventDefault();
        const trimmedEmail = useremail.trim();
        const trimmedPassword = password.trim();
        if (trimmedEmail === "" || trimmedPassword === "") {
          toast.error("Please fill in all required fields.");
          return;
        }
        try {
          const response = await axiosInstance.post("/auth/login", {
            useremail: trimmedEmail,
            password: trimmedPassword,
          });
          const userdata = response.data;
          localStorage.setItem("userData", JSON.stringify(userdata));
          localStorage.setItem("userToken", JSON.stringify(userdata.token));
    
          dispatch(login(userdata));
          navigate("/");
    
          toast.success("User created successfully.");
        } catch (error) {
          console.error(error);
          toast.error("User is blocked or please correct password");
        }
      };
      const handleGoogleLogin = async (credentialResponse) => {
        try {
            const idToken = credentialResponse.credential;
            console.log(idToken);
            const response = await axiosInstance.post("/auth/googlelogin", {
                idToken
            });
    
            const userData = response.data;
    
            // Assuming 'dispatch', 'toast', and 'navigate' are properly defined and accessible
            // Dispatching login action
            dispatch(login(userData));
            // Storing user data in local storage
            localStorage.setItem("userData", JSON.stringify(userData));
            // Displaying success toast message
            toast.success("Successfully logged in");
            // Redirecting to home page
            navigate("/");
        } catch (error) {
            console.error("Google authentication error:", error);
            toast.error("Google authentication error");
        }
    };
    
  return (
    <>
     <GoogleOAuthProvider clientId="403350995020-264n3rfveb7f7986m3i6jsl36s97ier8.apps.googleusercontent.com">
    <ToastContainer/>
    <div className='bg-gray-100  flex items-center justify-center '> 

{/* login container */}
<div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl mt-20'>
    <div className='sm:w-1/2 px-16'>
        <h2 className='font-bold text-2xl text-[#002D74]'>Login</h2>
        <p className='text-sm mt-4 text-[#002D74]'>If you have already login</p>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4' action=''>
            <input className='p-2 mt-8 rounded-xl border' type='text' name='email' value={useremail}
                    onChange={(e) => setEmail(e.target.value)}  placeholder='Enter your Email'/>
           <div className='relative'>
           <input className='p-2 rounded-xl border w-full' value={password}
                    onChange={(e) => setPassword(e.target.value)}  type='password' name='password' placeholder='Enter your Password'/>
           <FaEye color='gray' className='absolute top-1/2 right-3 -translate-y-1/2'/>
           </div>
            <button className='bg-[#002D74] text-center rounded-xl text-white py-2 hover:bg-white hover:shadow-xl hover:text-[#002D74] cursor-pointer'>Login</button>
            <GoogleLogin
                    text="continue_with"
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />


        </form>
        <div className='grid grid-cols-3 items-center text-gray-500 mt-10'>
            <hr className='border-gray-500'/>
            <p className='text-center text-sm'>New User</p>
            <hr className='border-gray-500'/>
            
          
        </div>
        <div className='mt-3 flex text-sm justify-between items-center '>
                <p className='border-gray-500'>Don't have Account?</p>
                <button type='submit' className='py-2 px-4 rounded-xl bg-white border hover:bg-[#002D74] hover:text-white hover:shadow-lg '>
  <Link to='/register'>Register</Link></button>
            </div>

    </div>

    <div className='w-1/2 '>
        <img className='h-[500px] sm:block hidden rounded-2xl' src={signuplogo} />
    </div>

</div>

    </div>
    </GoogleOAuthProvider>
    </>
  )
}

export default Login