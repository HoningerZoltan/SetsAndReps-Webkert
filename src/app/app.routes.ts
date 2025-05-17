import { Routes } from '@angular/router';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { WaterComponent } from './pages/water/water.component';
import { authGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'exercises', component: ExercisesComponent, canActivate: [authGuard]},
    {path: 'calendar', component: CalendarComponent, canActivate: [authGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'water', component: WaterComponent, canActivate: [authGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
