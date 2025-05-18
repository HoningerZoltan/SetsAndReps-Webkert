import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    @Input() isLoggedIn: boolean = true;
    @Output() signOutClicked = new EventEmitter<void>();
  items = [
    { RouterLink: 'home', icon: 'fa fa-home', label: 'Home' },
    { RouterLink: 'exercises', icon: 'fa fa-dumbbell', label: 'Exercises' },
    { RouterLink: 'calendar', icon: 'fa fa-calendar', label: 'Calendar' },
    { RouterLink: 'water', icon: 'fal fa-tint', label: 'WaterTracker' },
    { RouterLink: 'profile', icon: 'fal fa-user', label: 'Profile' },
    { RouterLink: null, icon: 'fa fa-sign-out-alt', label: 'Sign Out', action: 'signout' }
  ];

  loggedOutItems = [
    { RouterLink: 'login', icon: 'fa fa-sign-in-alt', label: 'Login' },
    { RouterLink: 'signup', icon: 'fa fa-user-plus', label: 'SignUp' }
  ];

}
