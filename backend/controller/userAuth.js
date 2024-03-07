import  sanitize  from 'mongo-sanitize';
// import userschema
import userModel from "../model/userModel.js";
// import token genarator
import generateToken from "../utilitis/genrateToken.js";

// import mailSender

import { sendMail } from "../utilitis/mailSender.js";

/*user register*/

const globalData = {
    otp: '', // Use type null | number for otp
    user: {
        username: '',
        useremail: '',
        phone: '',
        password: '',
    }, // Define a type for user
};

// User register
const userSignup = async (req, res) => {
    
    try {


        const { username, useremail, password, phone } = req.body;


        if (!username || !useremail || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await userModel.findOne({ useremail });
        const userPhone = await userModel.findOne({ phone });

        if (userExists || userPhone) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = {
            username :sanitize(username),
            useremail:sanitize(useremail),
            phone:sanitize(phone),
            password:sanitize(password),
        };



        globalData.user = user;


        if (user) {

            const mail = sendMail(user.useremail, res);
            globalData.otp = mail;
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

/*User register*/

// User register with otp

const userSingupVerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        if (otp == globalData.otp) {
            const addUser = await userModel.create(globalData.user);
            const token = generateToken(addUser._id);
            return res.status(200).json({
                _id: addUser?._id,
                name: addUser?.username,
                email: addUser?.useremail,
                phone: addUser?.phone,
                token,
            });
        } else {
            res.status(500).json({ message: "Wrong otp" });
        }
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
};
// User register with otp

/*User login*/

const loginUser = async (req, res) => {
    const { useremail, password } = req.body;

    try {
        const user = await userModel
            .findOne({ useremail })
           

        // Use UserModel instead of userModel

        if (!user) {
            return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
        }
       

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            return res.json({
                _id: user._id,
                name: user.username,
                phone: user.phone,
                email: user.useremail,
                isBlocked: user.isBlocked,
                token,
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/*User login*/


/*user profile*/

const userProfile = async (req, res) => {
    try {
        const { id } = req.params
        const userDetails = await userModel.find({ _id: id })

        if (userDetails) {
            return res.status(200).json({ userDetails })

        } else {
            return res.status(400).json({ message: 'error' })

        }

    } catch (error) {
        console.log(error);

    }
}


export {
    userSignup,
    loginUser,
    userSingupVerifyOtp,
    userProfile

};