import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../AxiosInterceptor/userAxiosInterceptor'
import {  signup } from "../../feature/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";



const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(60);
    useEffect(() => {
      // Start the timer when the component mounts
      const countdown = setInterval(() => {
        // Decrement the timer by 1 second
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      // Redirect to '/signup' when the timer reaches 0
      if (timer === 0) {
        navigate("/signup");
      }
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(countdown);
    }, [timer, navigate]);
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post(
          "/auth/signup_verify",
          {
            otp,
          }
        );
  
        // Check the response status and handle success or error accordingly
        if (response.status === 200) {
          toast.success("Signup successful");
          const userdata = response.data;
  
         
          localStorage.setItem("userData", JSON.stringify(userdata));
          localStorage.setItem("userToken", JSON.stringify(userdata.token));
        
          
  
          dispatch(signup(userdata));
  
          navigate("/");
        } else {
          // If the response contains a data property with an error message, use it; otherwise, provide a generic error message
          const errorMessage =
            response.data && response.data.message
              ? response.data.message
              : "Wrong otp";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("An error occurred while verifying OTP:", error);
        toast.error("Wrong otp"); // Display a generic error message
      }
    };
    useEffect(() => {
      if (localStorage.getItem("userData")) {
        navigate("/");
      }
    }, [navigate]);
  return (
    <div>
    <ToastContainer />
    <div className='flex justify-center items-center h-screen bg-indigo-600'>
           <div className=' items-center justify-center w-96 shadow-lg p-6 bg-white rounded-md'>
               <h1 className='text-3xl block text-center font-semibold'>
                   Sign up</h1>
                   <form onSubmit={(e) => handleSubmit(e)}>
                   <div className='mt-3'>

                       <label htmlFor="username" className='block text-base mb-2'>User Name</label>
                       <input type="text" id="username" className="border w-full text-base px-2 py-1 focus:outline-none  focus:ring-0 focus:border-gray-600" value={otp}
             onChange={(e) => setOtp(e.target.value)}placeholder='Enter your name...' />
                   </div>
                   <span>Please check your mail</span>
                   <div className='mt-3 flex  justify-between items-center'>
                       <div className='mt-4'>
                           <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 px-5'>Sumbit</button>
                       </div>
                       </div>
                   </form>

                   <div className="mt-3">
         Redirecting to signup page in {timer} seconds...
       </div>

                   </div>
                   </div>
 
</div>
  )
}

export default Otp
