import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'event-app',
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
    `
})
export class EventAppComponent {
  title = 'ng-fundamentals';

  constructor(private auth: AuthService){}

  ngOnInit() {
    this.auth.checkAuthenticationStatus()     //persisting authentication status across refreshes.
  }
}
