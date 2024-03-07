import mongoose, { Schema, model, Model } from "mongoose";




const courseSchema = new Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    courseduration: {
      type: Date,
      required: true,
    },
    coursedescription: {
      type: String,
      required: true,
    },
    category: {
      type:String ,
       
      required: true,
    },
    coursefee: {
      type: Number,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    
    photo: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Replace with your actual instructor collection name
      required: true,
    },
    like: [
      {
        start: Number,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user", 
        },
      },
    ],
    courseLessons: [
        {
          title: {
            type: String,
            required: true,
          },
          duration: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          video: {
            type: String,
            required: true,
          },
          
          isActive: {
            type: Boolean,
            required: true,
            default: true,
          },
        },
      ],
    totalLike: {
      type: Number, // Change the type to Number
      default: 0,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const CourseModel = model("Course", courseSchema);
export default CourseModel;