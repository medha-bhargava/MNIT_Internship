import express from "express";
// import { login } from "../controllers/authController";
const router = express.Router();
import User from "../models/User.js";

// router.post("/login", login);

router.post("/login", async (req, res) => {
    console.log("Login route hit");
    const userId = req.body.userId;
    const password = req.body.password;
    const role = req.body.role;
    console.log("LOGIN ATTEMPT:");
    console.log("userId:", userId);
    console.log("password:", password);
    console.log("role:", role);

    try {
        const user = await User.findOne({ userId });
        console.log("User from DB:", user);

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            console.log("Incorrect password");
            return res.status(401).json({ message: "Invalid password" });
        }

        if (user.role !== role) {
            console.log("Role mismatch");
            return res.status(401).json({ message: "Invalid role" });
        }

        console.log("Login successful", user.userName);

        res.status(200).json({
            userId: user.userId,
            userName: user.userName,
            role: user.role,
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
