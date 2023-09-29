import { config } from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONT_URL],
    credentials: true,
  })
);

// importing all routes
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

// set routes to base url
app.use("/api/v1/user", userRoutes);

// page not found
app.all("*", (req, res) => {
  res.send("opps ! 404 error. page not found");
});

// handle error and send resopnse
app.use(errorMiddleware);

export default app;
