import { Component } from '@angular/core';
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
    //Menu átváltása -- menu.component.cs-ben is át kell állítani
    isLoggedIn: boolean = false;
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

}
