import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../utils/error.js";


// const getAllUsers = async (req, res) => {}


// using try-catch error-handling: error-handling is IMPORTANT for async functions
const registerNewUser = async (req, res, next) => {

    try {
        
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if(user) return next(new ErrorHandler("User already exits", 404));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        sendCookie(user, res, "Registered Successfully", 201);

    } catch (error) {
        next(error);
    }

}


const loginUser = async (req, res, next) => {

    try {
        
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password"); // in user schema in models, we have set {select: false} in case of password, so we have to request for the password

        if(!user) return next(new ErrorHandler("Invalid Email or Password!", 400));
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password!", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);

    } catch (error) {
        next(error);
    }

}


const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

}


const logoutUser = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logged out successfully."
    });

}


// const updateUser = async (req, res) => {
    
//     const { id } = req.params;
    
//     let user = await User.findById(id);

//     const { name, email, password } = req.body;

//     user = {
//         name,
//         email,
//         password
//     }

//     res.json({
//         success: true,
//         message: "Updated Successfully",
//         user
//     });
    
// }


// const deleteUser = async (req, res) => {
    
//     const { id } = req.params;

//     await User.findByIdAndRemove(id);

//     res.json({
//         success: true,
//         message: "Deleted Successfully"
//     });

// }


// Named Exports
export { registerNewUser, loginUser, getMyProfile, logoutUser };