const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    await mongoose.connect(uri);
    console.log("DB Connected Successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("DB Connection Error:", error.message);
    throw error; // Let the caller handle the error
  }
};

module.exports = dbConnect;