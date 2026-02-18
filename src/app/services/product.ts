import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://angular-pwa-shop.onrender.com/api/products';

  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
