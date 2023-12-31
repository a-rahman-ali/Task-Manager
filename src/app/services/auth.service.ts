import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Adjust the URL based on your JSON server endpoint
  // private apiUrl = 'http://localhost:3000/'; 
  private apiUrl = '/api/'; 
  private isAuthenticatedValue = false;
  currentUser: any;

  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get(`${this.apiUrl}users?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map((users: any) => {
          if (users.length > 0) {
            // Set the current user if login is successful
            this.currentUser = users[0];
            this.setAuthenticated(true);
          }
          return users;
        })
      );
  }
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  logout(): void {
    this.isAuthenticatedValue = false;
    this.currentUser = null;
  }
  isUserRegistered(email: string): Observable<boolean> {
    const url = `${this.apiUrl}/users?email=${email}`;
    return this.http.get<any[]>(url).pipe(
      map((users: any) => {
        return users.length > 0;
      })
    );
  }
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedValue = isAuthenticated;
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users`);
  }
  
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users`, user);
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
