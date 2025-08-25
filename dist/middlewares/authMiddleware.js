import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const bearer = authHeader?.split(" ")[0];
        if (bearer !== "Bearer") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader?.split(" ")[1];
        if (!token) {
            return res.status(500).send({ message: "Token not found" });
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            return res.status(500).send({ message: "Access token secret is not defined" });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};
export { authMiddleware };
//# sourceMappingURL=authMiddleware.js.map