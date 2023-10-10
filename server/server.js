import RazorPay from "razorpay";
import app from "./app.js";
import "./config/cloudinary.config.js";
import connectToDB from "./config/db.config.js";

const PORT = process.env.PORT || 5713;

export const razorpay = new RazorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`server is running on port: ${PORT}`);
});
