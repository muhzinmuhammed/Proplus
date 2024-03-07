import express from "express";
import { userSignup, loginUser, userSingupVerifyOtp, userProfile } from "../controller/userAuth.js";

import { protect } from "../middleware/protection.js";

const userRouer = express.Router();


/*user register*/
userRouer.post("/signup", userSignup);
/*user register*/

/*user login*/
userRouer.post("/login", loginUser);

/*user login*/

/*user login with otp*/
userRouer.post("/signup_verify", userSingupVerifyOtp);
/*user login with otp*/


//**user profile */
userRouer.get('/user_details/:id', protect, userProfile)
//**user profile */


export default userRouer