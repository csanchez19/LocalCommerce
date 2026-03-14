import {Routes} from '@angular/router';
import {authGuard, publicGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () => import('./features/auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/tabs/tabs.component').then(m => m.TabsComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'wallet',
        loadComponent: () => import('./features/wallet/components/wallet/wallet.component').then(m => m.WalletComponent)
      },
      {
        path: 'purchases',
        loadComponent: () => import('./features/purchases/components/purchases/purchases.component').then(m => m.PurchasesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/components/profile/profile.component').then(m => m.ProfileComponent)
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
    loadComponent: () => import('./features/shop/components/shop-detail/shop-detail.component').then(m => m.ShopDetailComponent)
  }
];
