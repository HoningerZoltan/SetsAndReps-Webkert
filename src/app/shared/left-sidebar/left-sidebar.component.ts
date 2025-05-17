import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  @Input() isLeftSidebarCollapsed: boolean = false;
  @Output() ChangeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  @Input() isLoggedIn: boolean = true; 
  @Output() signOutClicked = new EventEmitter<void>();

  toggleCollapse(): void {
    this.ChangeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
  }

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
