import { inject } from '@angular/core';
import { AuthService } from './services/auth';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';

export const authGuard = () => {
	const authService = inject(AuthService);
	const router = inject(Router);
	const token = localStorage.getItem('token');

	if (!token) {
		router.navigate(['/login']);
		return false;
	}

	return authService.checkAuth(token).pipe(
		map((res: any) => {
			if (res && res.payload && res.payload.user) {
				return true;
			}
			router.navigate(['/login']);
			return false;
		})
	);
};