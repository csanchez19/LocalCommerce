import {Routes} from '@angular/router';
import {authGuard, publicGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./tabs.component').then(m => m.TabsComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent)
      },
      {
        path: 'wallet',
        loadComponent: () => import('./wallet.component').then(m => m.WalletComponent)
      },
      {
        path: 'purchases',
        loadComponent: () => import('./purchases.component').then(m => m.PurchasesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile.component').then(m => m.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'shop/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./shop-detail.component').then(m => m.ShopDetailComponent)
  }
];
