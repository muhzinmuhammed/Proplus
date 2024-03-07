

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signuplogo from '../../assets/book2.jpg'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import axiosInstance from '../../AxiosInterceptor/userAxiosInterceptor'

const Signup = () => {
    const [username, setName] = useState("");
    const [useremail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();
    
    const isStrongPassword = (password) => {
        // Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };

    const isPhoneNumberValid = (phone) => {
        // Phone number validation using a simple regex for demonstration purposes.
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const isNameValid = (username) => {
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return nameRegex.test(username);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const trimmedName = username.trim();
        const trimmedEmail = useremail.trim();
        const trimmedPhone = phone.trim();
        const trimmedPassword = password.trim();

        if (
            trimmedName === "" ||
            trimmedEmail === "" ||
            trimmedPhone === "" ||
            trimmedPassword === ""
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (!isNameValid(trimmedName)) {
            toast.error('Please correct name')

        }
        if (!isStrongPassword(trimmedPassword)) {
            toast.error(
                "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters."
            );
            return;
        }

        if (password !== confirmpassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!isPhoneNumberValid(trimmedPhone)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/signup', {
                username: trimmedName,
                useremail: trimmedEmail,
                phone: trimmedPhone,
                password: trimmedPassword,
            });
            console.log(response,"pp");

            navigate('/user_otp');
        } catch (error) {
            console.error('An error occurred while registering:',);
            toast.error("An error occurred.");
        }
    };
  return (
    <>
    <ToastContainer/>
    <div className='bg-gray-100  flex items-center justify-center '> 

{/* login container */}
<div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl mt-20'>
    <div className='sm:w-1/2 px-16'>
        <h2 className='font-bold text-2xl text-[#002D74]'>Register</h2>
        <p className='text-sm mt-4 text-[#002D74]'>If you have already login</p>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4' action=''>
        <input className='p-2 mt-8 rounded-xl border' type='text' name='name'value={username}
                                onChange={(e) => setName(e.target.value)} placeholder='Enter your Full Name'/>
            <input className='p-2  rounded-xl border' type='text' name='email'value={useremail}
                                onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email'/>
            <input className='p-2  rounded-xl border' type='text' name='phone'value={phone}
                                onChange={(e) => setPhone(e.target.value)}  placeholder='Enter your Phone Number'/>
           <div className='relative'>
           <input className='p-2 rounded-xl border w-full' type='password' value={password}
                                onChange={(e) => setPassword(e.target.value)}  name='password' placeholder='Enter your Password'/>

           <FaEye color='gray' className='absolute top-1/2 right-3 -translate-y-1/2'/>
           </div>
           <div className='relative'>
           <input className='p-2 rounded-xl border w-full' type='password' name='password'  value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter your Password'/>
           
           <FaEye color='gray' className='absolute top-1/2 right-3 -translate-y-1/2'/>
           </div>
            <button type='submit' className='bg-[#002D74] text-center rounded-xl text-white py-2 hover:bg-white hover:shadow-xl hover:text-[#002D74] cursor-pointer'>Register</button>


        </form>
        
        <div className='mt-3 flex text-sm justify-between items-center '>
                <p className='border-gray-500'>Do you have Account?</p>
                <button className='py-2 px-4 rounded-xl bg-white border hover:bg-[#002D74] hover:text-white hover:shadow-lg '>
  <Link to='/login'>Login</Link></button>
            </div>

    </div>

    <div className='w-1/2 '>
        <img className='h-[500px] sm:block hidden rounded-2xl' src={signuplogo} />
    </div>

</div>

    </div>
      
    </>
  )
}

export default Signup