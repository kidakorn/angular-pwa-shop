import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = `${environment.apiUrl}` ;  
  currentUser = signal<any>(null);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.checkAuth(token).subscribe();
    }
  }

  login(value: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, value).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.currentUser.set(res.payload.user);

        Swal.fire({
          icon: 'success',
          title: 'Login success',
          text: 'Login Successful',
          timer: 1500,
          showConfirmButton: false,
        });

        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  checkAuth(token: string) {
    return this.http.get(`${this.apiUrl}/current-user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap((res: any) => {
        this.currentUser.set(res.payload.user);
      }),
      catchError((err) => {
        localStorage.removeItem('token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
        return of(null);
      })
    )
  }

  register(value: any) {
    return this.http.post(`${this.apiUrl}/register`, value).pipe(
      tap((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Register success',
          text: 'Please login to continue',
          timer: 1500,
          showConfirmButton: false,
        });
        this.router.navigate(['/login']);
      })
    );
  }



}
