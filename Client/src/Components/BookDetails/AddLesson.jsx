import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import axios from "axios";
const AddLesson = () => {
    const [bookName,setBookName]=useState()
    const [description,setDescription]=useState()
    const [content,setContent]=useState()

    const [video,setVideo]=useState('')
    const [books, setBooks] = useState([]);
    
    const [cloudinaryURL,setCloudinaryURL]=useState('')
    const storedUserDataString = localStorage.getItem("userData");

    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
  
      const navigate=useNavigate()
      function handleChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setVideo(e.target.files[0]);
        }
      }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform photo upload first
        await handlePhotoUpload();
    
        // Check if the photo upload was successful
        if (!cloudinaryURL) {
          toast.error("Error uploading photo");
          return;
        }
    
        // Send the course data to your server
        axiosInstance
          .post("/course/addLesson", {
            coursename: bookName,
          
          description: description,
           title:  content,
          
            video:cloudinaryURL,
       
          
           
          })
          .then((response) => {
            console.log(response.data);
            
            toast.success("Book Published  successfully");
            setTimeout(() => {
                navigate("/my_course");
                
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            toast.error('Course alredy exist');
          });
    };

    const handlePhotoUpload = async () => {
        try {
          const formData = new FormData();
          if (video) {
            formData.append("file", video);
            formData.append("upload_preset", "mtcgx5gz");
            formData.append("cloud_name", "dfnwvbiyy");
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dfnwvbiyy/video/upload",
              formData
            );
    
            setCloudinaryURL(response.data.public_id);
          }
        } catch (error) {
          console.error("Error uploading Video:", error);
        }
      };
      useEffect(() => {
        const userData = localStorage.getItem("userData");
        const parseData = userData ? JSON.parse(userData) : null;
        if (!parseData) {
          navigate("/login");
        }
      }, [navigate]);
      useEffect(() => {
        // Fetch data from your API using Axios
        axiosInstance
          .get(`/course/allcourses/${storedUserData?._id}`)
          .then((response) => {
            
            setBooks(response?.data?.courses);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }, []);
      console.log(books);
      
  return (
   <>
   <ToastContainer/>
    <div className="flex items-center justify-center w-full  bg-purple-950 h-screen  ">
    <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Course Name</label>
        {/* Dropdown menu for course names */}
        <select
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Course Name</option>
          {/* Mapping over the books to generate options */}
          {books.map((book) => (
            <option key={book._id} value={book.coursename}>
              {book.coursename}
            </option>
          ))}
        </select>
      </div>
      <div >
        <label className="block text-gray-700 text-sm font-bold mb-2" >
        Description
        </label>
        <textarea value={description}  onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Description"/>
      
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Title
        </label>
        <input value={content}  onChange={(e) => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Enter Book Title"/>
      </div>

    

     


      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Video
        </label>
        <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            accept="video/*" // Specify the file type
            onChange={handleChange}
          />

{video && (
            <video
              controls
              src={URL.createObjectURL(video)}
              style={{ width: "20%" }}
            />
          )}
      </div>
      <div className="flex items-center justify-center">
        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
        </button>
       
      </div>
    </form>
    
  </div>
   </>
  )
}

export default AddLesson