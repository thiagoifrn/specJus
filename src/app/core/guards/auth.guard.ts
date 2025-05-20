import { Injectable } from '@angular/core';
import { 
  CanActivateFn, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedInValue) {
    return true;
  }
  
  // Navigate to login page with return url
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};