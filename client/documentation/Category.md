# Documentation for Categories

- client > src > app > category: It manages categories, providing functionality for adding, editing, searching, and deleting categories. It uses MatTable, MatPaginator, and HttpClient for handling data from a REST API.

## Dependencies

- Angular Material (MatTableModule, MatPaginatorModule)
- Angular Forms (FormsModule)
- Angular HTTP (HttpClientModule)
- Angular Common (CommonModule)
- Tailwind CSS for layout and styling
- Material Icons for icons

## Key Features

- Fetching Categories **fetchCategories()**: Retrieves a list of categories from the API and displays them in a table.
- Search **applyFilter()**: Allows filtering of categories by name.
- Add Category **addCategory()**: Modal to add a new category using a form.
- Edit Category **updateCategory()**: Modal to edit an existing category.
- Delete Category **deleteCategory()**: Removes a category with confirmation and feedback.
- Count Total Categories **getTotalCategoryCount()**: Count the total number of categories.
- Pagination: Supports pagination of categories using MatPaginator

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
