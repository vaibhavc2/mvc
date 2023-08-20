import jwt from "jsonwebtoken";


export const sendCookie = (user, res, message, statusCode=200) => {

    const token = jwt.sign({ _id:user._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 1000, // 1 day
        sameSite: ((process.env.NODE_ENV).toLowerCase() === "development") ? "lax" : "none",
        secure: ((process.env.NODE_ENV).toLowerCase() === "development") ? false : true
    }).json({
        success: true,
        message,
    });

}