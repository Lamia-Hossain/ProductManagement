import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'products', component: ProductComponent },
];
