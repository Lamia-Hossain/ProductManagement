# Documentation for Products

- client > src > app > product: It manages products, providing functionality for adding, editing, searching, and deleting products. It uses MatTable, MatPaginator, and HttpClient for handling data from a REST API.

## Dependencies

- Angular Material (MatTableModule, MatPaginatorModule)
- Angular Forms (FormsModule)
- Angular HTTP (HttpClientModule)
- Angular Common (CommonModule)
- Tailwind CSS for layout and styling
- Material Icons for icons

## Key Features

- Fetching Products **fetchProducts()**: Retrieves a list of products from the API and displays them in a table.
- Search **applyFilter()**: Allows filtering of products by product name.
- Add Products **addProduct()**: Modal to add a new products using a form.
- Add Category **addCategory()**: Modal to add a new category using a form while adding a product if user wants to.
- Edit Products **updateProduct()**: Modal to edit an existing product.
- Delete Products **deleteProduct()**: Removes a product with confirmation and feedback.
- Count Total Products **getTotalProductCount()**: Count the total number of products.
- Pagination: Supports pagination of products using MatPaginator

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
