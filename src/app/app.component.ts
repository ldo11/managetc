import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'managetc';
  constructor(private route: Router, private authService: AuthService) {
    this.route.navigateByUrl('login');
  }
  logout() {
    this.authService.signOut().then(_ => {
      alert('Log out');
      this.route.navigateByUrl('login');
    });
  }
}
