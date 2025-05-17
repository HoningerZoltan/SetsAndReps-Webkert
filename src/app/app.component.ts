import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from './shared/services/auth.service'; // fontos!
import { LeftSidebarComponent } from './shared/left-sidebar/left-sidebar.component';
import { MainComponent } from './shared/main/main.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LeftSidebarComponent,
    MainComponent,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLftSidebarCollapsed = signal<boolean>(false);
  userIsLoggedIn = false;

  constructor(private authService: AuthService) {} // ← így injektálod

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((val: boolean) => {
      this.userIsLoggedIn = val;
    });
  }

  handleSignOut(): void {
  this.authService.signOut(); // már elvégzi a redirectet
}
}
