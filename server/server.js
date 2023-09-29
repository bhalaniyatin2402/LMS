import app from "./app.js";
import connectToDB from "./config/db.config.js";
import "./config/cloudinary.config.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`server is running on port: $${PORT}`);
});
