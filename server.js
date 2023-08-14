import { app } from "./app.js";
import { connectDB } from "./data/database.js";


// connecting Database
connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
