import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  emailTouched = false;
  passwordTouched = false;
  invalidCredentials = false;

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  isValidCredentials(): boolean {
    return this.validateEmail(this.user.email) && this.validatePassword(this.user.password);
  }

  login(event: Event) {
    event.preventDefault();

    this.emailTouched = true;
    this.passwordTouched = true;
    this.invalidCredentials = false;

    if (this.isValidCredentials()) {
      this.authService.login(this.user).subscribe(
        (response) => {
          console.log('Login response:', response);

          if (response.length > 0) {
            console.log('Login successful', response);
            this.authService.setAuthenticated(true);
            this.router.navigate(['/home']);
          } else {
            console.error('Invalid credentials');
            this.invalidCredentials = true;
          }
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid email or password!');
        }
      );
    } else {
      alert('Invalid email or password format!');
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  handleEmailInput(event: Event): void {
    this.user.email = (event.target as HTMLInputElement).value;
  }

  handlePasswordInput(event: Event): void {
    this.user.password = (event.target as HTMLInputElement).value;
  }
}
