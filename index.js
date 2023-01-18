import express from "express";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log('connected to mongodb'))
    .catch((err) => console.log(err));


//middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/authenticate", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(PORT, () => {
    console.log("Connected to Server: " + PORT);
});