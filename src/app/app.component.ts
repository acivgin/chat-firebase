import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-firebase';
  constructor(
    public readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
