import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://ronak:aQJB6lAB9bGt1fBU@tripcluster.x08bk.mongodb.net/";

if (!MONGO_URI) {
  console.error("url not exists");
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default dbConnect;
