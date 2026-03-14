import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return true;
};

export const publicGuard: CanActivateFn = () => {
  return true;
};
