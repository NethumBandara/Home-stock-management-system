const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const stockRouter = require("./routes/stockRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/stocks", stockRouter);

mongoose
  .connect(
    "mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
