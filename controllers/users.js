import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import { invalidEmailPassword } from "../utils/data.js";


// const getAllUsers = async (req, res) => {}


const registerNewUser = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if(user) return res.status(404).json({
        success: false,
        message: "User already exists",
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    sendCookie(user, res, "Registered Successfully", 201);

}


const loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password"); // in user schema in models, we have set {select: false} in case of password, so we have to request for the password

    if(!user) return res.status(404).json(invalidEmailPassword);

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(404).json(invalidEmailPassword);

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);

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