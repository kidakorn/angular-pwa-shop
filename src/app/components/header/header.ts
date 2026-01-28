import { Component, signal } from '@angular/core';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = signal(false);

  constructor(public cartService: CartService) {}

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
