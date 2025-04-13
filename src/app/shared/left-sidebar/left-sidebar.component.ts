import { CommonModule, NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  isLeftSidebarCollapsed=input.required<boolean>();
  ChangeIsLeftSidebarCollapsed=output<boolean>();
  //Menu átváltása -- menu.component.cs-ben is át kell állítani
  isLoggedIn: boolean = true;
  items = [
    {
      RouterLink: 'home',
      icon: 'fa fa-home',
      labe: 'Home',
    },
    {
      RouterLink: 'exercises',
      icon: 'fa fa-dumbbell',
      labe: 'Exercises',
    },
    {
      RouterLink: 'calendar',
      icon: 'fa fa-calendar',
      labe: 'Calendar',
    },
    {
      RouterLink: 'water',
      icon: 'fal fa-tint',
      labe: 'WaterTracker',
    },
    {
      RouterLink: 'profile',
      icon: 'fal fa-user',
      labe: 'Profile',
    },
  ];
  loggedOutItems=[
    {
      RouterLink: 'login',
      icon: 'fa fa-sign-in-alt',
      labe: 'Login'
    },
    {
      RouterLink: 'signup',
      icon: 'fa fa-user-plus',
      labe: 'SignUp'
    }
  ];

  toggleCollapse(): void {
    this.ChangeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

}
