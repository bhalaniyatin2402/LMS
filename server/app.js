import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// importing all routes
import errorMiddleware from "./middleware/error.middleware.js";
import courseRoutes from "./routes/course.route.js";
import myCourseRoutes from "./routes/my.course.route.js";
import paymentRoutes from "./routes/payment.route.js";
import userRoutes from "./routes/user.routes.js";

// set routes to base url
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/my-courses", myCourseRoutes);

// page not found
app.all("*", (req, res) => {
  res.send("opps ! 404 error. page not found");
});

// handle error and send resopnse
app.use(errorMiddleware);

export default app;
