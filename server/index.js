const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/connection");

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Import routes
const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");

// Use routes
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

// Set the port
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
