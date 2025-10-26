const express = require("express");
const dbConnect = require("./config/database");
const userRoutes = require("./routes/user")
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//parsers or middleware
app.use(express.json())


// mount routes
app.use("/api/v1",userRoutes);


dbConnect()



app.listen(PORT,()=>{
  console.log(`server is running at ${PORT}`);
})