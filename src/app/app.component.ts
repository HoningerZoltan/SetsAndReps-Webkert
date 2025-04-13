import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeftSidebarComponent } from './shared/left-sidebar/left-sidebar.component';
import { MainComponent } from './shared/main/main.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, LeftSidebarComponent, MainComponent,ReactiveFormsModule,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLftSidebarCollapsed = signal<boolean>(false);
  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean) : void{
    this.isLftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
