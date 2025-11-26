import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthRepository } from '../../data-repository/auth.repository';
import { LoginCredentials, LoginResponse } from '../models/auth.model';

interface TokenPayload {
  guardianId: number;
  role: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private authRepo: AuthRepository) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.authRepo.login(credentials).pipe(
      tap(res => this.authRepo.saveToken(res.token))
    );
  }

  get guardianId(): number | null {
    const token = this.authRepo.getToken();
    if (!token) return null;
    
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.guardianId;
  }

  get role(): string | null {
    const token = this.authRepo.getToken();
    if (!token) return null;
    
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role;
  }

  isAuthenticated(): boolean {
    return !!this.authRepo.getToken();
  }

  logout(): void {
    this.authRepo.clearToken();
  }
}