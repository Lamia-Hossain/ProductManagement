const db = require("../config/connection");

class CategoryModel {
  // Create a new category
  createCategory(category) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO categories SET ?", [category], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Fetch a category by its ID
  getCategoryById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Update an existing category
  updateCategory(id, category) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE categories SET ? WHERE id = ?",
        [category, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // Delete a category by ID
  deleteCategory(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Get all categories for dropdown
  getAllCategories() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT c.*, COUNT(p.id) AS product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        GROUP BY c.id
      `;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = new CategoryModel();
