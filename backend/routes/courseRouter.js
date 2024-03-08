import express from 'express'
import {
    addCourses,
    editCourse,
    editCoursePage,
    getAllCourses,
    getCourses,
  } from "../controller/courseController.js";
  import { addLesson,getLesson } from '../controller/lessonController.js';
import { protect } from "../middleware/protection.js";
  const courseRouter = express.Router();
/*add courses*/
  courseRouter.post("/addCourse", protect, addCourses);

  /*get all courses*/
courseRouter.get("/allcourses/:id", protect, getCourses);
/*get all courses*/

  /*get all courses*/
  courseRouter.get("/getcourses", protect, getAllCourses);
  /*get all courses*/

/*add lessons*/
courseRouter.post("/addLesson", protect, addLesson);


/* get all lessons*/
courseRouter.get("/get_lessons/:id", protect, getLesson);
/* get all lessons*/

export default courseRouter