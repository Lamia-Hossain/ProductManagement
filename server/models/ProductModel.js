const db = require("../config/connection");

class ProductModel {
  // Add a new product with validation logic
  createProduct(product) {
    return new Promise((resolve, reject) => {
      // Check if the category has more than 10 products
      db.query(
        "SELECT COUNT(*) as productCount FROM products WHERE category_id = ?",
        [product.category_id],
        (err, result) => {
          if (err) {
            return reject(err);
          }

          const productCount = result[0].productCount;
          if (productCount >= 10) {
            return reject(
              new Error("Cannot add more than 10 products in this category.")
            );
          }

          // If validation passes, insert the product
          db.query("INSERT INTO products SET ?", [product], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      );
    });
  }

  // Fetch a product by its ID
  getProductById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Update an existing product
  updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE products SET ? WHERE id = ?",
        [product, id],
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

  // Delete a product by ID
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Get all products with total price calculation
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id",
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            // Add total key for each product and format the create_date to DD-MMM-YYYY
            const productsWithTotal = result.map((product) => ({
              ...product,
              total: parseFloat((product.price * product.quantity).toFixed(2)),
              create_date: new Date(product.create_date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, "-")
                .replace(",", "-"), // Format date to DD-MMMM-YYYY
            }));
            resolve(productsWithTotal);
          }
        }
      );
    });
  }
}

module.exports = new ProductModel();
