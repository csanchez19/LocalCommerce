import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { auth } from './firebase';
import { User } from 'firebase/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  return new Promise<boolean>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      unsubscribe();
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  
  return new Promise<boolean>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      unsubscribe();
      if (user) {
        router.navigate(['/home']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
