import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      console.log('ข้อมูลที่ได้จาก API:', response);
      this.products = response;
      this.cdr.detectChanges();
    });
  }
}
