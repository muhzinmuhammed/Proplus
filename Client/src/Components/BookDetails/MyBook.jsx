import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInterceptor/userAxiosInterceptor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoBookmarkSlashFill } from "react-icons/go";
import { FaBookmark, FaEdit, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
const MyBooks = () => {
    const storedUserDataString = localStorage.getItem("userData");
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  console.log(searchResults); // New state for search results
    const storedUserData = storedUserDataString
      ? JSON.parse(storedUserDataString)
      : null;
      const baseUrl =
      "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
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
      const navigate=useNavigate()
      useEffect(() => {
        const userData = localStorage.getItem("userData");
        const parseData = userData ? JSON.parse(userData) : null;
        if (!parseData) {
          navigate("/login");
        }
      }, [navigate]);

      const [currentPage, setCurrentPage] = useState(0);
      const booksPerPage = 6;
    
      const offset = currentPage * booksPerPage;
      const currentBooks = books?.slice(offset, offset + booksPerPage);
    
      // Calculate pageCount
      const pageCount = Math.ceil(books?.length / booksPerPage);
    
      const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };
/*un publush book*/
      

      const handleUnPublish = async (id) => {
        


        try {
            // Show a confirmation sweet alert
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Do You want to unPublish this Book",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, unpublish it!",
            });
      
            // If the user clicks the confirm button
            if (result.isConfirmed) {
              // Make the delete request
              await axiosInstance.put(`/books/unpublish/${id}`);
      
              // Show a success sweet alert
              Swal.fire("Unpublished Book.", "success");
      
              // Reload the page
              setTimeout(() => {
                window.location.reload();
                
              }, 1000);
            }
          } catch (error) {
            // Show an error sweet alert
            Swal.fire("Error!", error?.message || "An error occurred.", "error");
          }
      };
      /*un publush book*/

      /* publush book*/
    
      const handlePublish = async (id) => {
        try {
            // Show a confirmation sweet alert
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Do You want to Publish this Book",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Published Book !",
            });
      
            // If the user clicks the confirm button
            if (result.isConfirmed) {
              // Make the delete request
              await axiosInstance.put(`/books/published/${id}`);
      
              // Show a success sweet alert
              Swal.fire("Unpublished Book.", "success");
      
              // Reload the page
           
                window.location.reload();
                
            
            }
          } catch (error) {
            // Show an error sweet alert
            Swal.fire("Error!", error?.message || "An error occurred.", "error");
          }
      };
      
       /* publush book*/

      /*search*/ 
       /* search book*/
  const handleSearch = async (e) => {
    
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axiosInstance.post('/books/search', {
          searchItem: searchValue,
        });

        // Update the searchResults state
        setSearchResults(response?.data?.results);

        // Update the post state only if there are search results
        setBooks(response?.data?.results || []);

         // Reset current page when searching
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
      
      

        /*search*/ 


        

    return (
     <>
     <ToastContainer/>
      <div className='bg-purple-950 h-[100%] font-serif text-white'>
      <Link to={'/add_course'}>  <button className="bg-purple-400 rounded-md  hover:bg-white hover:text-purple-400 float-end me-20 mt-10 mx-auto px-5 py-2 ">Add Course</button>
      </Link> 
      <Link to={'/add_lesson'}>  <button className="bg-purple-400 rounded-md  hover:bg-white hover:text-purple-400 float-end me-20 mt-10 mx-auto px-5 py-2 ">Add Lesson</button>
      </Link> 
      <div className='text-center py-10'>
          
          <h1 className='text-4xl w-96 mx-auto leading-normal font-bold mb-12'>Collections Of My Course</h1>
          
         <form onSubmit={handleSearch}>
         <div className="flex items-center gap-2 justify-center rounded-[5px] ">
        <input  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)} type="text" className="bg-[#F8F9FC] text-purple-900 h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal "placeholder="Search" />
        <button type="submit" className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
            <FaSearch  color="white"/>
        </button>
     </div>
         </form>

         
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 mt-10 max-w-5xl gap-8 mx-auto group'>
          {currentBooks?.length === 0 ? (
  <h1 className="flex items-center justify-center mx-auto font-extrabold">No books available</h1>
) : (
  currentBooks?.map((book) => (
    <div
      key={book?.id} // Don't forget to add a unique key to each element in the array
      className='bg-white/10 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 cursor-pointer p-8 rounded-xl '
    >
      <img className='h-20 mx-auto w-full' src={`${baseUrl}/${book?.photo}`} alt={book?.bookName} />
      {/* <h4 className='font-bold mt-2 font-mono uppercase text-xl'>{book?.userId?.username}</h4> */}
      <h4 className='font-bold mt-2 uppercase text-xl'>Course Name: {book?.coursename}</h4>
      <h4 className='font-semibold mt-2  text-lg'>Category: {book?.category}</h4>
      <p className='text-sm leading-7 my-3 font-light opacity-50'>
      Title: {book?.title}
      </p>

      <p className='text-sm leading-7 my-3 font-light opacity-50'>
      Description: {book?.coursedescription}
      </p>
      
      <div className="grid grid-cols-2 gap-3">
      <Link to={`/edit_book/${book?._id}`} className='gap-2 py-2.5 px-8 rounded-full'>
  <FaEdit size={30} />
</Link>
        {
          book?.status === true ? 
            <button onClick={() => handleUnPublish(book?._id)} className='gap-x-2 py-2.5 px-8 rounded-full'><FaBookmark size={30} /></button> :
            <button onClick={() => handlePublish(book?._id)} className='gap-x-2 py-2.5 px-8 rounded-full'><GoBookmarkSlashFill size={30} /></button>
        }
      </div>
    </div>
  ))
)}

</div>

          
      </div>
      <div  className="flex items-center justify-center  mx-auto mt-8">
        
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination flex'}
        activeClassName={'active'}
      />

</div>
     
  </div>
     </>
    )
  }
  
  export default MyBooks
  