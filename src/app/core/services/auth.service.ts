import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  // Mock credentials for demo
  private mockEmail = 'advogado@exemplo.com';
  private mockPassword = 'senha123';

  constructor() {
    // Check if user is already logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedIn.next(isLoggedIn);
  }

  login(email: string, password: string): Observable<boolean> {
    // Simulate API request with delay
    return of(email === this.mockEmail && password === this.mockPassword).pipe(
      delay(800),
      tap(isValid => {
        if (isValid) {
          this.loggedIn.next(true);
          localStorage.setItem('isLoggedIn', 'true');
        }
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }
}