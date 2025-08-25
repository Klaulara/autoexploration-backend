import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Logging in user:", email);
    console.log("User password:", password);
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({ userId: user.id }, accessTokenSecret, {
            expiresIn: "1d",
        });
        return res.json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export { login };
//# sourceMappingURL=authController.js.map