import express from "express";

import { registerNewUser, loginUser, getMyProfile, logoutUser } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


// router.get("/all", getAllUsers);


router.post("/login", loginUser);


router.post("/register", registerNewUser);


router.get("/logout", logoutUser)


router.get("/me", isAuthenticated, getMyProfile); // using isAuthenticated middleware for checking login status


// router.route("/id/:id")
// .put(updateUser)
// .delete(deleteUser);


export default router;