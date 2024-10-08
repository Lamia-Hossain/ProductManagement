import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuItems = [
    { name: 'Dashboard', link: '/', icon: 'dashboard' },
    { name: 'Categories', link: '/categories', icon: 'category' },
    { name: 'Products', link: '/products', icon: 'shopping_cart' },
  ];
}
