import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Earlier you have to use body parser for accepting json
app.use(express.json({
    limit: "16kb"
}))

// For handling data which comes from uel
app.use(express.urlencoded({
    extended: true, // for using objects under objects
    limit: "16kb"
}))

// When you have to upload files to server like cloudinary then first 
// you keep in public folder locally
app.use(express.static("public")) // Here public is folder name

// Set up a cookie parser
app.use(cookieParser());

// Routes
import userRoutes from "./routes/User.routes.js";
import contestantRoutes from "./routes/Contestant.routes.js";
// import subscriptionRoutes from "./routes/subscription.routes.js";
// import videoRouter from "./routes/video.routes.js";
// import likeRouter from "./routes/like.routes.js";
// import commentRouter from "./routes/comment.routes.js";
// import dashboardRouter from "./routes/dashboard.routes.js";
// import playlistRouter from "./routes/playlist.routes.js";

// Routes declaration
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/contestant", contestantRoutes)
// app.use("/api/v1/subscriptions", subscriptionRoutes)
// app.use("/api/v1/videos", videoRouter)
// app.use("/api/v1/like", likeRouter)
// app.use("/api/v1/comments", commentRouter)
// app.use("/api/v1/dashboard", dashboardRouter)
// app.use("/api/v1/playlist", playlistRouter)

export { app }