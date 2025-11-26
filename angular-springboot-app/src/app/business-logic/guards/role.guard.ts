import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    const role = authService.role;
    
    if (!role || !allowedRoles.includes(role)) {
      router.navigate(['/login']);
      return false;
    }
    
    return true;
  };
};