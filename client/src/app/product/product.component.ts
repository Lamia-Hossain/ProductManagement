import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../app.component.css'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'product_name',
    'category_name',
    'quantity',
    'price',
    'total',
    'description',
    'create_date',
    'actions',
  ];
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  loading = true;
  errorMessage: string | null = null;
  selectedProduct: any = null;
  showModal: boolean = false;

  newProduct = {
    productName: '',
    categoryId: null,
    price: null,
    description: '',
    quantity: null,
    createDate: '',
  }; // For adding new product
  showAddModal: boolean = false; // Controls Add Product modal visibility
  showAddCategoryModal = false;
  newCategoryName = '';

  dataSource = new MatTableDataSource<any>(); // Updated data source for pagination
  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for the paginator

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:8080/product').subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        console.error('Error fetching products', error);
        this.loading = false;
      }
    );
  }

  getTotalProductCount(): number {
    return this.filteredProducts.length;
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:8080/category').subscribe(
      (data) => {
        this.categories = data;
        this.filteredCategories = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching categories';
        console.error('Error fetching categories', error);
        this.loading = false;
      }
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddModal() {
    this.newProduct = {
      productName: '',
      categoryId: null,
      price: null,
      description: '',
      quantity: null,
      createDate: '',
    };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addProduct() {
    this.http.post('http://localhost:8080/product', this.newProduct).subscribe(
      () => {
        this.showNotification('Product added successfully!', 'Close');
        this.fetchProducts(); // Refresh the list after adding
        this.closeAddModal();
      },
      (error) => {
        console.error('Error adding product', error.error.message);
        this.showNotification(`${error.error.message}`, 'Close', true);
      }
    );
  }

  openAddCategoryModal() {
    this.showAddCategoryModal = true;
  }

  closeAddCategoryModal() {
    this.showAddCategoryModal = false;
  }

  addCategory() {
    const newCategory = { name: this.newCategoryName };
    this.http.post('http://localhost:8080/category', newCategory).subscribe(
      () => {
        this.showNotification('Category added successfully!', 'Close');
        this.fetchCategories(); // Refresh the list after adding
        this.closeAddCategoryModal();
      },
      (error) => {
        console.error('Error adding category', error);
        this.showNotification(`${error.error.message}`, 'Close', true);
      }
    );
  }

  openEditModal(product: any) {
    this.selectedProduct = { ...product };
    // Convert create_date to YYYY-MM-DD format
    const dateParts = this.selectedProduct.create_date.split('-');
    const day = dateParts[0];
    const month =
      new Date(Date.parse(dateParts[1] + ' 1, 2024')).getMonth() + 1; // Convert month name to number
    const year = dateParts[2];
    this.selectedProduct.create_date = `${year}-${month
      .toString()
      .padStart(2, '0')}-${day.padStart(2, '0')}`;

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateProduct() {
    if (this.selectedProduct) {
      this.http
        .put(
          `http://localhost:8080/product/${this.selectedProduct.id}`,
          this.selectedProduct
        )
        .subscribe(
          () => {
            this.showNotification('Product updated successfully!', 'Close');
            this.fetchProducts();
            this.closeModal();
          },
          (error) => {
            console.error('Error updating product', error);
            this.showNotification(`${error.error.message}`, 'Close', true);
          }
        );
    }
  }

  deleteProduct(id: number) {
    this.http.delete(`http://localhost:8080/product/${id}`).subscribe(
      () => {
        this.showNotification('Product deleted successfully!', 'Close');
        this.fetchProducts();
      },
      (error) => {
        console.error('Error deleting product', error);
        this.showNotification(`${error.error.message}`, 'Close', true);
      }
    );
  }

  showNotification(message: string, action: string, isError: boolean = false) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
