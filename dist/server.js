import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
dotenv.config();
const app = express();
// app.use(cors());
app.use(express.json());
app.use("/api", auth);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=server.js.map