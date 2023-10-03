import app from "./app.js";
import connectToDB from "./config/db.config.js";
import "./config/cloudinary.config.js";
import RazorPay from "razorpay";

const PORT = process.env.PORT || 3000;

export const razorpay = new RazorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`server is running on port: ${PORT}`);
});
