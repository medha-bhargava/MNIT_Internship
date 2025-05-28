
import User from "../models/User.js";

export async function mylogin(req, res) {
    const userId = req.body.userId;
    const password = req.body.password;
    const role = req.body.role;

    console.log(`Login attempt: userId=${userId}, role=${role}`);

    try {
        const user = await User.findOne({ userId });

        if (!user || user.password !== password || user.role !== role) {
            console.log("Input data is incorrect");
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("Login successful");

        // Ideally, you'd return a JWT token. For now, send back user details.
        res.json({
            userId: user.userId,
            userName: user.userName,
            role: user.role,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
