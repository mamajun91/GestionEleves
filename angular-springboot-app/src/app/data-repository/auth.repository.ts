import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../infrastructure/config/api.config';
import { LoginCredentials, LoginResponse } from '../business-logic/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthRepository {

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.login, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.clear();
  }
}