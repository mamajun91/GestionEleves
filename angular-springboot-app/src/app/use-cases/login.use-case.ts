import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../business-logic/services/auth.service';
import { LoginCredentials } from '../business-logic/models/auth.model';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  execute(credentials: LoginCredentials) {
    this.authService.login(credentials).subscribe({
      next: () => {
        const role = this.authService.role;
        this.navigateByRole(role);
      },
      error: () => alert('Identifiants invalides')
    });
  }

  private navigateByRole(role: string | null) {
    switch(role) {
      case 'LEGAL_GUARDIAN':
        this.router.navigate(['/accueil-parent']);
        break;
      case 'TEACHER':
        this.router.navigate(['/accueil-teacher']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}