import mongoose from "mongoose";


export const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "mvc",
    }).then((c) => {
        console.log(`Database connected successfully with host: ${c.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
}