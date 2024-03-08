


import CourseModel from "../model/courseModel.js";

/* add lessons */

const addLesson = (async (req, res) => {
  try {
    const { video, coursename, title, description } = req.body;

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { coursename: coursename },
      {
        $push: {
          courseLessons: {
            video,
            title: title,
         
            description: description,
          },
        },
      },
      { new: true }
    );
    if (updatedCourse) {
      res.status(201).json(updatedCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/* add lessons */

/* get all Lessons*/
const getLesson = (async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await CourseModel.findById(id);

    const allLessons = courses?.courseLessons;

    if (allLessons) {
      res.status(200).json({
        allLessons,
      });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

export { addLesson, getLesson };