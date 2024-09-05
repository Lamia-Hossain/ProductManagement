const Product = require("../models/ProductModel");

class ProductController {
  // Create a new product with validation logic of one category can have at maximum of 10 products
  async createProduct(req, res) {
    const {
      productName,
      categoryId,
      price,
      description,
      quantity,
      createDate,
    } = req.body;

    if (!productName || !categoryId || !price || !quantity || !createDate) {
      return res
        .status(400)
        .json({ message: "Bad Request: Missing required fields." });
    }

    if (isNaN(price) || isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Price and quantity must be numbers." });
    }

    try {
      const newProduct = {
        product_name: productName,
        category_id: categoryId,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity),
        create_date: createDate,
      };

      const result = await Product.createProduct(newProduct);
      return res
        .status(201)
        .json({ message: "Product created successfully", id: result.insertId });
    } catch (error) {
      if (
        error.message.includes(
          "Cannot add more than 10 products in this category."
        )
      ) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a product by ID
  async getProductById(req, res) {
    const id = req.params.id;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Product ID." });
    }

    try {
      const result = await Product.getProductById(id);

      if (!result.length) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update a product by ID
  async updateProduct(req, res) {
    const id = req.params.id;
    const {
      product_name,
      category_id,
      price,
      description,
      quantity,
      create_date,
    } = req.body;

    if (!product_name || !category_id || !price || !quantity || !create_date) {
      return res
        .status(400)
        .json({ message: "Bad Request: Missing required fields." });
    }

    if (isNaN(price) || isNaN(quantity)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Price and quantity must be numbers." });
    }

    try {
      const updatedProduct = {
        product_name: product_name,
        category_id: category_id,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity),
        create_date: create_date,
      };

      await Product.updateProduct(id, updatedProduct);
      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete a product by ID
  async deleteProduct(req, res) {
    const id = req.params.id;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Product ID." });
    }

    try {
      await Product.deleteProduct(id);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all products with total for each product
  async getAllProducts(req, res) {
    try {
      const products = await Product.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
