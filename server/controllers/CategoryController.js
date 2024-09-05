const Category = require("../models/CategoryModel");

class CategoryController {
  // Create a new category
  async createCategory(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    try {
      const newCategory = { name };
      const result = await Category.createCategory(newCategory);
      return res.status(201).json({
        message: "Category created successfully",
        id: result.insertId,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a category by ID
  async getCategoryById(req, res) {
    const id = req.params.id;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Category ID." });
    }

    try {
      const result = await Category.getCategoryById(id);

      if (!result.length) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Update a category by ID
  async updateCategory(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    try {
      const updatedCategory = { name };
      await Category.updateCategory(id, updatedCategory);
      return res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete a category by ID
  async deleteCategory(req, res) {
    const id = req.params.id;

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "Bad Request: Invalid Category ID." });
    }

    try {
      await Category.deleteCategory(id);
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        error: "There exists some products under this category!!",
      });
    }
  }

  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await Category.getAllCategories();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();
