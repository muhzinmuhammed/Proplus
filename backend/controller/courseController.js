

import courseModel from "../model/courseModel.js";

/* add course */

const addCourses = (async (req, res) => {
    console.log(req.body);
  try {
    const {
      coursename,
      courseduration,
      coursedescription,
      category,
      userId,
      photo,
      coursefee,
      title
      
    } = req.body;

    if (!coursename  || !coursedescription || !category || !userId||!photo||!coursefee||!title) {
        return res.status(400).json({ message: "All fields are required" });
    }

    
    const courseExits = await courseModel.findOne({ coursename });
  

    if (courseExits ) {
        console.log("ll");
        return res.status(409).json({ message: "Course already exists" });
    }

    

    const Course = await courseModel.create({
      coursename,
      
      coursedescription,
      category,
      userId,
      photo,
      coursefee,
      title
     
    });
    if (Course) {
      res.status(200).json({
        coursename,
        courseduration,
        coursedescription,
        category,
        userId,
        photo,
        coursefee,
        title
       
      });
    } else {
      res.status(400).json({ message: "Invalid instructor data" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/* add course */

/* get all courses*/
const getCourses =(async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await courseModel
      .find({ userId: id })
      .populate("userId")
     

    if (courses) {
      res.status(200).json({
        courses,
      });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/* get all courses*/

const getAllCourses =(async (req, res) => {
    try {
      
  
      const courses = await courseModel
        .find()
        .populate("userId")
       
  
      if (courses) {
        res.status(200).json({
          courses,
        });
      }
    } catch (error) {
      res.status(500); // Internal server error
      throw error;
    }
  });

/* edit page */
const editCoursePage = async (req, res) => {
  try {
    const { id } = req.params;
    const editCourse = await courseModel.findById(id);
    if (editCourse) {
      res.status(200).json({
        editCourse,
      });
    } else {
      res.status(400).json({ message: "No course" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server" });
  }
};
/* edit page * /

/* update courses */
const editCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      coursename,
      courseduration,
      coursedescrption,
      category,
      coursefee,
    } = req.body;
    const course = await courseModel.findById(id);
    if (!course) {
      // Handle the case where the course with the given ID is not found.
      return res.status(404).json({ message: "Course not found" });
    } else {
      const updateCourse = await courseModel.findByIdAndUpdate(
        id,
        {
          coursename,
          courseduration,
          coursedescrption,
          category,
          coursefee,
        },
        { new: true }
      );
      res.status(200).json({
        updateCourse,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
/* edit courses */

/*approved course*/

const approvedCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      const courseApproved = await courseModel.findByIdAndUpdate(id, {
        isApproved: true,
      });
  
      if (!courseApproved) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      return res.status(200).json({ message: "Course approved" });
    } catch (error) {
      console.error("Error approving course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  /*approved course*/
  
  /*unapproved course*/
  const unApprovedCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      const course = await courseModel.findByIdAndUpdate(id, {
        isApproved: false,
      });
  
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      return res.status(200).json({ message: "Course unapproved successfully" });
    } catch (error) {
      console.error("Error unapproving course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  /*unapproved course*/

export {addCourses, getCourses, editCourse, editCoursePage,approvedCourse,unApprovedCourse,getAllCourses };