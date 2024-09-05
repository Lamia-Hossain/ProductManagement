const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Create a new product
router.post("/", ProductController.createProduct);

// Get a product by ID
router.get("/:id", ProductController.getProductById);

// Update a product
router.put("/:id", ProductController.updateProduct);

// Delete a product
router.delete("/:id", ProductController.deleteProduct);

// Get all products with total price
router.get("/", ProductController.getAllProducts);

module.exports = router;
