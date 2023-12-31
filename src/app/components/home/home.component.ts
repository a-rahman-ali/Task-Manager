// home.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) {
    console.log(this.authService.getCurrentUser()?.name);
    
  }
  // Logout method
  logout(): void {
    // Call the logout method from AuthService
    this.authService.logout();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
