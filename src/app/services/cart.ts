import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<Product[]>([]);

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price, 0)
  );

  cartCount = computed(() => this.cartItems().length);

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);
    console.log('เพิ่มสินค้าแล้ว:', product.name);
  }

  removeFromCart(index: number) {
    this.cartItems.update(items => {
      const newItems = [...items];
      newItems.splice(index, 1);
      return newItems;
    });
  }
}
