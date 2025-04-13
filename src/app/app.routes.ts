import { Routes } from '@angular/router';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WaterComponent } from './pages/water/water.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'exercises', component: ExercisesComponent},
    {path: 'calendar', component: CalendarComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'water', component: WaterComponent},
];
