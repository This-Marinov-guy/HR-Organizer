import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import HttpError from "./models/Http-error.js";
import userRouter from "./routes/users-routes.js";
import projectRouter from "./routes/projects-routes.js";
import chatRouter from "./routes/chats-routes.js";
//start with npm start
const app = express();
//external packages setup
app.use(bodyParser.json());
app.use("/dist/uploads/images", express.static(path.join("dist", "uploads", "images")));
//avoid CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
//routes
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/chat", chatRouter);
//no page found
app.use((req, res, next) => {
    const error = new HttpError("Page not found", 404);
    return next(error);
});
// error handling
//db connection
mongoose
    .connect("mongodb+srv://vlady:vlady10029011@test4.twugcuc.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log("Connected to DB");
    app.listen(5000);
})
    .catch((err) => console.log("Failed to Connect ", err));
//# sourceMappingURL=app.js.map