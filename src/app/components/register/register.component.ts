import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
  };
  showSuccessMessage = false;
  registeredEmail = false;
  constructor(private authService: AuthService, private router: Router) {}

  register(event: Event) {
    event.preventDefault();
    if (this.isValidRegistration()) {
      this.authService.getUsers().subscribe(users => {
        // Check if the email is already taken
        if (users.some(user => user.email === this.user.email)) {
          console.log('Email already exists.');
          this.registeredEmail = true;
        } else {
          // Email is not taken, proceed with registration
          const nextUserId = users.length + 1;

          const newUser = { id: nextUserId, ...this.user };

          this.authService.register(newUser).subscribe(response => {
            console.log('User registered:', response);
            this.showSuccessMessage = true;

            setTimeout(() => {
              this.showSuccessMessage = false;

              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }, 3000);
          });
        }
      });
    } 
    else {
      console.log("Some thing went wrong while registering");
    }
  }

  updateName(event: Event) {
    this.user.name = (event.target as HTMLInputElement).value;
  }

  continuousEmailValidation() {
    // This method is called on each input event for continuous email validation
    this.registeredEmail = false;
    this.isValidEmailFormat(this.user.email); // Trigger validation

    this.authService.getUsers().subscribe(users => {
      this.registeredEmail = users.some(user => user.email === this.user.email);
    });
  }

  updateEmail(event: Event) {
    this.user.email = (event.target as HTMLInputElement).value;
    this.continuousEmailValidation();
  }

  updatePassword(event: Event) {
    this.user.password = (event.target as HTMLInputElement).value;
  }

  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  isValidPasswordFormat(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private isValidRegistration(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.isValidEmailFormat(this.user.email) &&
      this.isValidPasswordFormat(this.user.password)
    );
  }
}
