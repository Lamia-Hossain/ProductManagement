# API Documentation for Categories

This API provides endpoints for Category.

## Endpoints

1. **Add Category:**

   - URL: `http://localhost:8080/category`
   - Method: POST
   - Body: Form data with name for category.

   ```
   {
       "name": "Apparel"
   }
   ```

2. **Get Category by ID**

   - URL: `http://localhost:8080/category/:id`
   - Replace `:id` with the actual ID you want to retrieve.
   - Method: GET
   - No additional data needed.

3. **Edit Category**

   - URL: `http://localhost:8080/category/:id`
   - Replace `:id` with the actual ID you want to retrieve.
   - Method: PUT
   - Body: Form data with updated name for category.
     ```
     {
        "name": "Apparel"
     }
     ```

4. **Delete Category**

   - URL: `http://localhost:8080/category/:id`
   - Replace `:id` with the actual ID you want to update.
   - Method: DELETE
   - No additional data needed.

5. **Get All Categories**

   - URL: `http://localhost:8080/category`
   - Method: GET
   - No additional data needed.
