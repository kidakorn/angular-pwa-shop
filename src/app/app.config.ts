import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { LucideAngularModule, ShoppingCart, Plus, ShoppingBag, Trash2, Star, Minus, X, Menu, CircleCheck, Landmark, QrCode, Truck, User, ChevronDown, LogOut } from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({ ShoppingCart, Plus, ShoppingBag, Trash2, Star, Minus, X, Menu, CircleCheck, Landmark, QrCode, Truck, User, ChevronDown, LogOut })
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};
