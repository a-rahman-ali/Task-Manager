import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management';
  constructor(public authService: AuthService, private router: Router) {
    console.log(this.authService.getCurrentUser()?.name);
    
  }
  // Logout method
  logout(): void {
    this.authService.logout();
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
