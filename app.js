const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const apiRoute = require("./routes/storeImages");
const getRoute = require("./routes/getImages");
const evenRegistration = require("./routes/eventRegistration");

dotenv.config();
const app = express();
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully with indexes");
  } catch (error) {
    console.error("Error connecting to MongoDB or creating indexes:", error);
    process.exit(1);
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));
app.use('/ids', evenRegistration );


const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes
app.use(apiRoute);
app.use(getRoute);

// Default route
app.get("/", (req, res) => {
  res.status(200).json("API Connected");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
connectToMongoDB();
