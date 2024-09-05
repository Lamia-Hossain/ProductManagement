import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chart') private chartRef!: ElementRef;

  products: any[] = [];
  categories: any[] = [];
  loading = true;
  errorMessage: string | null = null;
  chart: any;

  // Ensure that chart.js is only used on the client-side by checking
  // if user is in a browser environment before creating the chart.
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  ngAfterViewInit() {
    if (this.categories.length > 0) {
      this.createChart();
    }
  }

  ngOnDestroy() {
    // Destroy the chart
    if (this.chart) {
      this.chart.destroy();
    }
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:8080/product').subscribe(
      (data) => {
        this.products = data;
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
    return this.products.length;
  }

  fetchCategories() {
    this.http.get<any[]>('http://localhost:8080/category').subscribe(
      (data) => {
        this.categories = data;
        this.loading = false;
        this.createChart();
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

  createChart() {
    // Prevent the chart from being rendered on the server
    if (isPlatformBrowser(this.platformId)) {
      if (this.chart) {
        this.chart.destroy(); // Destroy the previous chart if it exists
      }

      const ctx = this.chartRef.nativeElement.getContext('2d');
      const labels = this.categories.map((c) => c.name);
      const data = this.categories.map((c) => c.product_count);

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Products per Category',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
