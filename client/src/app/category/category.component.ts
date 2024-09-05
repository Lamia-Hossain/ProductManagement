import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css', '../app.component.css'],
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'product_count', 'actions'];
  categories: any[] = [];
  searchTerm: string = '';
  loading = true;
  errorMessage: string | null = null;
  selectedCategory: any = null;
  newCategoryName: string = ''; // For adding new category
  showModal: boolean = false; // Controls Edit Category modal visibility
  showAddModal: boolean = false; // Controls Add Category modal visibility

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:8080/category').subscribe(
      (data) => {
        this.categories = data;
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching categories';
        console.error('Error fetching categories', error);
        this.loading = false;
      }
    );
  }

  getTotalCategoryCount(): number {
    return this.categories.length;
  }

  applyFilter() {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddModal() {
    this.newCategoryName = '';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addCategory() {
    const newCategory = { name: this.newCategoryName };
    this.http.post('http://localhost:8080/category', newCategory).subscribe(
      () => {
        this.showNotification('Category added successfully!', 'Close');
        this.fetchCategories(); // Refresh the list after adding
        this.closeAddModal();
      },
      (error) => {
        console.error('Error adding category', error);
        this.showNotification(`${error.error.message}`, 'Close', true);
      }
    );
  }

  openEditModal(category: any) {
    this.selectedCategory = { ...category };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  updateCategory() {
    if (this.selectedCategory) {
      this.http
        .put(
          `http://localhost:8080/category/${this.selectedCategory.id}`,
          this.selectedCategory
        )
        .subscribe(
          () => {
            this.showNotification('Category updated successfully!', 'Close');
            this.fetchCategories(); // Refresh the list after deleting
            this.closeModal();
          },
          (error) => {
            console.error('Error updating category', error);
            this.showNotification(`${error.error.message}`, 'Close', true);
          }
        );
    }
  }

  deleteCategory(id: number) {
    this.http.delete(`http://localhost:8080/category/${id}`).subscribe(
      () => {
        this.showNotification('Category deleted successfully!', 'Close');
        this.fetchCategories(); // Refresh the list after deleting
      },
      (error) => {
        console.error('Error deleting category', error);
        this.showNotification(`${error.error.error}`, 'Close', true);
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
