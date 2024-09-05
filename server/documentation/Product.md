# API Documentation for Products

This API provides endpoints for Product.

## Endpoints

1. **Add Product:**

   - URL: `http://localhost:8080/product`
   - Method: POST
   - Body: Form data with name for product.

   ```
   {
      "productName": "MauseE",
      "categoryId": 1,
      "price": 19.99,
      "description": "Product Description",
      "quantity": 10,
      "createDate": "2024-09-02"
   }
   ```

2. **Get Product by ID**

   - URL: `http://localhost:8080/product/:id`
   - Replace `:id` with the actual ID you want to retrieve.
   - Method: GET
   - No additional data needed.

3. **Edit Category**

   - URL: `http://localhost:8080/product/:id`
   - Replace `:id` with the actual ID you want to retrieve.
   - Method: PUT
   - Body: Form data with updated data for product.
     ```
     {
      "product_name": "Smart Watch",
      "category_id": 1,
      "price": 199.99,
      "description": "Product Description",
      "quantity": 10,
      "create_date": "2024-09-02"
     }
     ```

4. **Delete Product**

   - URL: `http://localhost:8080/product/:id`
   - Replace `:id` with the actual ID you want to update.
   - Method: DELETE
   - No additional data needed.

5. **Get All Get All Products**

   - URL: `http://localhost:8080/product`
   - Method: GET
   - No additional data needed.
