import {  selectUser } from "./features/userSlice";
import { Outlet,Navigate,Route,Routes,useLocation } from "react-router-dom"
import { Home,Profile,Login,Register,ResetPassword, Otp, AddBookPage, MyBooksPage, AddLessonPage, AllBooksPage } from "./Pages"
import { useSelector } from "react-redux"



function Layout(){
  const user = useSelector(selectUser)
    

  
  
  const location=useLocation()
  return user?.token  ?(
    <Outlet/>
  ):<Navigate to='/login' state={{from:location}} replace/>
}

function App() {
  
  
 

  return (
    <>
<div  className="w-full min-h-[100vh]">
  <Routes>
  <Route element={<Layout/>}>
    <Route path="/" element={<Home/>}/>
    <Route path="/profile/:id?" element={<Profile/>}/>
    
  </Route>
  <Route path="/add_course" element={<AddBookPage/>}/> 
  <Route path="/my_course" element={<MyBooksPage/>}/> 
  <Route path="/add_lesson" element={<AddLessonPage/>}/>
  <Route path="/course" element={<AllBooksPage/>}/>


    
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/user_otp" element={<Otp/>}/>

    <Route path="/rest-password" element={<ResetPassword/>}/>


  </Routes>
</div>
    
    </>
  )
}

export default App
