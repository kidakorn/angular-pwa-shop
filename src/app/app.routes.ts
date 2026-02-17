import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', component: ProductList, canActivate: [authGuard]},
	{ path: 'cart', component: Cart, canActivate: [authGuard]},
	{ path: 'login', component: Login },
];
