import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../models/product-data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private products: Product[] = PRODUCTS;

  constructor() { }

  getProducts() : Product[] {
    return this.products;
  }
}
