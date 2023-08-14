import mongoose from "mongoose";



export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "mvc",
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}